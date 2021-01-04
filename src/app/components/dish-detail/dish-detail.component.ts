import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Comment } from '../../shared/comment';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish!: Dish;
  dishIds!: string[];
  prev!: string;
  next!: string;

  commentForm!: FormGroup;
  comment!: Comment | null;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  formErrors: Record<string, any> = {
    'author':'',
    'comment':'',
  };

  validationMessages: Record<string, any> = {
    'author': {
      'required': 'Your name is required.',
      'minlength': 'Your name must be at least 2 characters long.',
    },
    'comment': {
      'required': 'Writing a comment is required.',
    }
  };

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.dishService.getDishIds()
    .subscribe(
      dishIds => this.dishIds = dishIds 
    );
    this.route.params
      .pipe(switchMap( (params: Params) => this.dishService.getDish(params['id'])))
      .subscribe( (dish: Dish) => {
        this.dish = dish; this.setPrevNext(dish.id);
      });
  }

  public createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', Validators.required],
      rating: 5,
    })

    this.commentForm.valueChanges
      .subscribe( data => this.onValueChange(data) );
    
    this.onValueChange();
  }

  public onSubmit(): void {
    const today = new Date( Date.now() );
    this.comment = this.commentForm.value;
    this.comment!.date = today.toISOString();


    this.dish.comments.push(this.comment!);
    this.comment = null;

    this.formDirective.resetForm();
    this.commentForm.reset({
      name: '',
      comment: '',
      rating: 5,
    });

  }

  public onValueChange(data?: any): void {
    if (!this.commentForm) return;
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previous error message
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && control.invalid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  public setPrevNext(dishId: string): void {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[ (this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[ (this.dishIds.length + index + 1) % this.dishIds.length];
  }

  public goBack(): void {
    this.location.back(); 
  }

}
