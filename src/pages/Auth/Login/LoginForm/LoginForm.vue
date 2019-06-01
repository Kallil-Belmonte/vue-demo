<template>
  <fragment>
    <!-- <loader v-if="loading"></loader> -->

    <form class="login-form" @submit.prevent="onSubmit()">
      <h1 class="page-title">Login</h1>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input v-model="form.email" id="email" :class="onSetInputClass('email')" type="email" name="email" />
        <!-- <template v-if="email.touched"> -->
          <!-- <div v-if="validations.required(form.email)" class="invalid-feedback d-block">E-mail is required</div> -->
          <div v-if="validations.email(form.email)" class="invalid-feedback d-block">Invalid e-mail</div>
        <!-- </template> -->

        <!-- <ng-template [ngIf]="loginFormFeedback.fieldsErrors.email.length > 0">
          <app-alert status="danger" [dismissible]="true" (dismissAlert)="onClearFormMessage(loginFormFeedback.fieldsErrors.email, i)" *ngFor="let errorMessage of loginFormFeedback.fieldsErrors.email; let i = index">
            {{ errorMessage }}
          </app-alert>
        </ng-template> -->
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="form.password" id="password" :class="onSetInputClass()" type="password" name="password" />
        <div v-if="validations.minLength3(form.password)" class="invalid-feedback d-block">Minimum 3 characters required</div>

        <!-- <ng-template [ngIf]="onShowFieldErrors('password')">
          <div [ngClass]="onSetPasswordFirstErrorClass()">Password is required</div>
          <div [ngClass]="onSetPasswordSecondErrorClass()">Minimum 3 characters required</div>
        </ng-template> -->

        <!-- <ng-template [ngIf]="loginFormFeedback.fieldsErrors.password.length > 0">
          <app-alert status="danger" [dismissible]="true" (dismissAlert)="onClearFormMessage(loginFormFeedback.fieldsErrors.password, i)" *ngFor="let errorMessage of loginFormFeedback.fieldsErrors.password; let i = index">
            {{ errorMessage }}
          </app-alert>
        </ng-template> -->
      </div>

      <div class="form-group">
        <!-- Ajustar a implementação desse checkbox conforme o plugin: https://hamed-ehtesham.github.io/pretty-checkbox-vue/ -->
        <div class="pretty p-svg p-curve">
          <input type="checkbox" /> <!-- formControlName="keepLogged" -->
          <div class="state p-primary">
            <svg class="svg svg-icon" viewBox="0 0 20 20"><path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white; fill: white;"></path></svg>
            <label>Keep logged</label>
          </div>
        </div>
      </div>

      <button class="btn btn-primary d-block mx-auto" type="submit" :disabled="formInvalid()">Login</button> <!-- :disabled="!form.valid" [disabled]="!loginForm.valid || loginForm.pristine" -->

      <div class="text-center">
        <hr class="mt-4" />
        Don't have an account? <router-link to="register">Register</router-link>
      </div>
    </form>
  </fragment>
</template>


<script>
// import Form from '@/shared/Components/Loader.vue';
import Validations from '@/shared/General/Validations';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'LoginForm',
  // components: {
  //   Loader
  // },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      validations: Validations,
      form: {
        email: '',
        password: '',
        feedbackErrors: {
          email: '',
          password: '',
        },
      }
    }
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    formInvalid() {
      return (
        Validations.required(this.form.email) ||
        Validations.email(this.form.email) ||
        Validations.required(this.form.password) ||
        Validations.minLength3(this.form.password)
      );
    },


    onSetInputClass(field, customClassNames = []) {
      const classList = ['form-control', ...customClassNames];

      if (this[field] && this[field].errors.length) classList.push('is-invalid');

      return classList;
    },

    // onSetFieldTouched(field) {
    //   this[field].touched = true;
    // },

    onSubmit() {
      console.log('Submetido!')
    }
  },


  mounted() {

  }
};
</script>


<style lang="scss" scoped>
.login-form {
  padding: 40px 40px 15px 40px;
  border-radius: 10px;
  background-color: #FFF;
  margin-top: 50px;

  .page-title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
