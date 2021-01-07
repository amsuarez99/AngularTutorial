import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Comment } from '../../shared/comment';
import { visibility, flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
  ]
})
export class DishDetailComponent implements OnInit {

  dish!: Dish | null;
  dishCopy!: Dish | null;
  dishIds!: string[];
  prev!: string;
  next!: string;
  visibility = 'shown';

  commentForm!: FormGroup;
  comment!: Comment | null;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  errMess!: string;
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
    @Inject('baseURL') public baseURL: string,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.dishService.getDishIds()
    .subscribe(
      dishIds => this.dishIds = dishIds,
      errMess => this.errMess = <any>errMess,
    );
    this.route.params
      .pipe(switchMap( (params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
      .subscribe( (dish: Dish) => {
        this.dish = dish; 
        this.dishCopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
      }, errMess => this.errMess = <any>errMess);
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


    this.dishCopy!.comments.push(this.comment!);
    this.dishService.putDish(this.dishCopy!)
      .subscribe(
        dish => {this.dish = dish; this.dishCopy = dish}, 
        err => {this.dish = null; this.dishCopy = null; this.errMess = <any>err}
      );
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
