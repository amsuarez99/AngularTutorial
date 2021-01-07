import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../../shared/feedback';
import { flyInOut, expand } from '../../animations/app.animation';
import {FeedbackService} from 'src/app/services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class ContactComponent implements OnInit {

  public feedbackForm!: FormGroup;
  public feedback: Feedback | null = null;
  public feedbackCopy: Feedback | null = null;
  public errMess!: string;


  public answeredForm: boolean = false;

  public contactType = ContactType;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  formErrors: Record<string, any> = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages: Record<string, any> = {
    'firstname' : {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 25 characters long.',
    },
    'lastname' : {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 25 characters long.',
    },
    'telnum' : {
      'required': 'Tel. Number is required.',
      'pattern': 'Tel. Number must contain only numbers.',
    },
    'email' : {
      'required': 'Email is required.',
      'email': 'Email not in valid format.',
    }
  };

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  public createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });


    this.feedbackForm.valueChanges
      .subscribe( data => this.onValueChanged(data) );

    this.onValueChanged(); // reset form validation messages
  }

  public onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for ( const key in control.errors ) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  public onSubmit(): void {
    this.answeredForm = true;
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback!)
      .subscribe(
        feedback => {
          this.feedbackCopy = feedback;
        },
        errMess => this.errMess = errMess,
    )
      this.formDirective.resetForm();
      this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      });
      setTimeout( () => {
        this.feedbackCopy = null;
        this.answeredForm = false;
      }, 5000);
  }

}
