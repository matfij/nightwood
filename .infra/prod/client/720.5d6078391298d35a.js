"use strict";(self.webpackChunknightwood_frontend=self.webpackChunknightwood_frontend||[]).push([[720],{3720:(B,_,a)=>{a.r(_),a.d(_,{StartModule:()=>E});var m=a(9808),d=a(1264),o=a(3075),u=a(591),L=a(7545),c=a(2402),t=a(1269),w=a(8747),v=a(3022),x=a(4549),C=a(5770),Z=a(208),P=a(9770),h=a(821);function A(n,i){1&n&&(t.TgZ(0,"div",4),t._UZ(1,"app-loading-indicator",5),t.qZA())}function y(n,i){if(1&n&&(t.TgZ(0,"div",2),t.YNc(1,A,2,0,"div",3),t.ALo(2,"async"),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",t.lcZ(2,1,e.submitLoading$))}}const M=function(){return{value:"nickname"}};function T(n,i){1&n&&(t.TgZ(0,"div",22),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.hij(" ",t.xi3(2,1,"errors.incorrectFieldsValue",t.DdM(4,M))," "))}const O=function(){return{value:"password"}};function I(n,i){1&n&&(t.TgZ(0,"div",23),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.hij(" ",t.xi3(2,1,"errors.incorrectFieldsValue",t.DdM(4,O))," "))}function S(n,i){1&n&&(t.TgZ(0,"button",24),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.hij(" ",t.lcZ(2,1,"start.login")," "))}function k(n,i){1&n&&(t.TgZ(0,"div",4),t._UZ(1,"app-loading-indicator",25),t.qZA())}function q(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"div",2),t.TgZ(1,"div",6),t.TgZ(2,"div",7),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"div",8),t._uU(6),t.ALo(7,"translate"),t.qZA(),t.TgZ(8,"div",9),t._UZ(9,"img",10),t.qZA(),t.TgZ(10,"div",11),t.TgZ(11,"form",12),t.NdJ("ngSubmit",function(){return t.CHM(e),t.oxw().login()})("keydown.enter",function(){return t.CHM(e),t.oxw().login()}),t.TgZ(12,"div",13),t._uU(13),t.ALo(14,"translate"),t.qZA(),t._UZ(15,"input",14),t.YNc(16,T,3,5,"div",15),t.TgZ(17,"div",16),t._uU(18),t.ALo(19,"translate"),t.qZA(),t._UZ(20,"input",17),t.YNc(21,I,3,5,"div",18),t.YNc(22,S,3,3,"button",19),t.ALo(23,"async"),t.YNc(24,k,2,0,"div",3),t.ALo(25,"async"),t.qZA(),t.qZA(),t.TgZ(26,"button",20),t.ALo(27,"async"),t._uU(28),t.ALo(29,"translate"),t.qZA(),t.TgZ(30,"div",21),t.NdJ("click",function(){return t.CHM(e),t.oxw().displayForgotPasswordModal$.next(!0)}),t._uU(31),t.ALo(32,"translate"),t.qZA(),t.qZA(),t.qZA()}if(2&n){const e=t.oxw();t.xp6(3),t.Oqu(t.lcZ(4,12,"common.appName")),t.xp6(3),t.Oqu(t.lcZ(7,14,"common.appHint")),t.xp6(5),t.Q6J("formGroup",e.form),t.xp6(2),t.Oqu(t.lcZ(14,16,"start.nickname")),t.xp6(3),t.Q6J("ngIf",e.form.controls.login.dirty&&!e.form.controls.login.valid),t.xp6(2),t.Oqu(t.lcZ(19,18,"start.password")),t.xp6(3),t.Q6J("ngIf",e.form.controls.password.dirty&&!e.form.controls.password.valid),t.xp6(1),t.Q6J("ngIf",!t.lcZ(23,20,e.submitLoading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(25,22,e.submitLoading$)),t.xp6(2),t.Q6J("disabled",t.lcZ(27,24,e.submitLoading$)),t.xp6(2),t.hij(" ",t.lcZ(29,26,"start.register")," "),t.xp6(3),t.hij(" ",t.lcZ(32,28,"start.forgotPassword")," ")}}function J(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"app-forgot-password",26),t.NdJ("close",function(){return t.CHM(e),t.oxw().displayForgotPasswordModal$.next(!1)}),t.qZA()}}let Y=(()=>{class n{constructor(e,r,s,p,g,f){this.router=e,this.route=r,this.authController=s,this.toastService=p,this.engineService=g,this.repositoryService=f,this.form=new o.cw({login:new o.NI(null,[o.kI.required,o.kI.minLength(c.yv),o.kI.maxLength(c.C_)]),password:new o.NI(null,[o.kI.required,o.kI.minLength(c.Z9),o.kI.maxLength(c.e2)])}),this.fields=[{form:this.form,key:"login",label:"start.nickname",type:"text",autocomplete:"username"},{form:this.form,key:"password",label:"start.password",type:"password",autocomplete:"current-password"}],this.submitLoading$=new u.X(!1),this.confirmLoading$=new u.X(!1),this.displayForgotPasswordModal$=new u.X(!1)}ngOnInit(){this.route.queryParams.subscribe(e=>{const r=e.token;!r||this.confirm(r)})}confirm(e){var r;const s={activationCode:e};null===(r=this.confirmLoading$)||void 0===r||r.next(!0),this.authController.confirm(s).subscribe(()=>{var p;null===(p=this.confirmLoading$)||void 0===p||p.next(!1),this.toastService.showSuccess("start.loginSuccess","start.confirmSuccess")},()=>{var p;return null===(p=this.confirmLoading$)||void 0===p?void 0:p.next(!1)})}login(){var e,r,s,p,g;if(!(null===(e=this.form.get("login"))||void 0===e?void 0:e.value)||!(null===(r=this.form.get("password"))||void 0===r?void 0:r.value))return void this.toastService.showError("errors.formInvalid","errors.formInvalidHint");const f={nickname:null===(s=this.form.get("login"))||void 0===s?void 0:s.value,password:null===(p=this.form.get("password"))||void 0===p?void 0:p.value};null===(g=this.submitLoading$)||void 0===g||g.next(!0),this.authController.login(f).pipe((0,L.w)(l=>(this.repositoryService.clearUserData(),this.repositoryService.setAccessToken(l.accessToken),this.repositoryService.setUserData(l),this.engineService.setInitialState(l),this.engineService.getExpeditionReports()))).subscribe(()=>{var l;null===(l=this.submitLoading$)||void 0===l||l.next(!1),this.toastService.showSuccess("start.loginSuccess","start.loginSuccessHint"),this.router.navigate(["../game/home"])},()=>{var l;return null===(l=this.submitLoading$)||void 0===l?void 0:l.next(!1)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(d.F0),t.Y36(d.gz),t.Y36(w.QD),t.Y36(v.k),t.Y36(x.S),t.Y36(C.b))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:6,vars:9,consts:[["class","wrapper-main",4,"ngIf"],[3,"close",4,"ngIf"],[1,"wrapper-main"],["class","spinner",4,"ngIf"],[1,"spinner"],["data-testid","app-confirm-spinner"],[1,"wrapper-content"],["data-testid","app-title",1,"title","title-main"],["data-testid","app-hint",1,"title","text-hint"],[1,"wrapper-img"],["data-testid","app-brand-image","src","assets/img/app/logo.png","alt","logo","draggable","false"],[1,"wrapper-form"],["data-testid","app-login-form",3,"formGroup","ngSubmit","keydown.enter"],["data-testid","app-login-label",1,"label"],["type","text","formControlName","login","autocomplete","nickname","data-testid","app-login-input",1,"input"],["class","error","data-testid","app-login-error",4,"ngIf"],["data-testid","app-password-label",1,"label",2,"margin-top","8px"],["type","password","formControlName","password","autocomplete","current-password","data-testid","app-password-input",1,"input"],["class","error","data-testid","app-password-error",4,"ngIf"],["type","submit","class","btn-base","data-testid","app-login-button",4,"ngIf"],["routerLink","../register","data-testid","app-register-button",1,"btn-base",3,"disabled"],[1,"btn-forgot",3,"click"],["data-testid","app-login-error",1,"error"],["data-testid","app-password-error",1,"error"],["type","submit","data-testid","app-login-button",1,"btn-base"],["data-testid","app-form-submit-spinner"],[3,"close"]],template:function(e,r){1&e&&(t.YNc(0,y,3,3,"div",0),t.ALo(1,"async"),t.YNc(2,q,33,30,"div",0),t.ALo(3,"async"),t.YNc(4,J,1,0,"app-forgot-password",1),t.ALo(5,"async")),2&e&&(t.Q6J("ngIf",t.lcZ(1,3,r.confirmLoading$)),t.xp6(2),t.Q6J("ngIf",!t.lcZ(3,5,r.confirmLoading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(5,7,r.displayForgotPasswordModal$)))},directives:[m.O5,Z.Q,o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u,d.rH,P.o],pipes:[m.Ov,h.X$],styles:[".color-Common[_ngcontent-%COMP%]{color:#bbc3c8}.color-Scarce[_ngcontent-%COMP%]{color:#cdc90b}.color-Rare[_ngcontent-%COMP%]{color:#c967eb}.color-Mythical[_ngcontent-%COMP%]{color:#00e1e1}.wrapper-main[_ngcontent-%COMP%]{height:100%;padding:0;align-content:center}.wrapper-content[_ngcontent-%COMP%]{max-width:600px;min-height:none;height:auto;margin:auto;padding:2rem 0rem}.title[_ngcontent-%COMP%]{color:#c5a45f}.wrapper-img[_ngcontent-%COMP%]{width:90%;max-width:250px;margin:20px auto}.wrapper-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;margin:0;animation:color-rotate 3s;animation-iteration-count:infinite;animation-direction:alternate}@keyframes color-rotate{0%{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}.wrapper-form[_ngcontent-%COMP%]{width:95%;max-width:240px;margin:0 auto 40px}.wrapper-form[_ngcontent-%COMP%]   .btn-base[_ngcontent-%COMP%]{max-width:100%}.title-main[_ngcontent-%COMP%]{margin-bottom:20px}.text-hint[_ngcontent-%COMP%]{font-size:20px}.btn-base[_ngcontent-%COMP%], .spinner[_ngcontent-%COMP%]{margin:20px auto}.btn-forgot[_ngcontent-%COMP%]{max-width:240px;margin:auto;color:#ffeeca;font-weight:500;font-size:13px;letter-spacing:.5px;cursor:pointer}.btn-forgot[_ngcontent-%COMP%]:hover{text-decoration:underline}@media screen and (max-width: 990px){.wrapper-content[_ngcontent-%COMP%]{height:100%}}"],changeDetection:0}),n})();const b=function(){return{value:"password"}};function $(n,i){1&n&&(t.TgZ(0,"div",8),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.hij(" ",t.xi3(2,1,"errors.incorrectFieldsValue",t.DdM(4,b))," "))}function U(n,i){1&n&&(t.TgZ(0,"div",8),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.hij(" ",t.xi3(2,1,"errors.incorrectFieldsValue",t.DdM(4,b))," "))}let N=(()=>{class n{constructor(e,r,s,p){this.router=e,this.route=r,this.authController=s,this.toastService=p,this.actionCode="",this.newPassword=new o.NI(null,[o.kI.required,o.kI.minLength(c.Z9),o.kI.maxLength(c.e2)]),this.newPasswordConfirm=new o.NI(null,[o.kI.required]),this.resetPasswordLoading$=new u.X(!1)}ngOnInit(){this.route.queryParams.subscribe(e=>{this.actionCode=e.token})}resetPassword(){if(!this.newPassword.valid||!this.newPasswordConfirm.valid)return;if(this.newPassword.value!==this.newPasswordConfirm.value)return void this.toastService.showError("errors.error","start.passwordsMismatch");const e={actionToken:this.actionCode,newPassword:this.newPassword.value};this.resetPasswordLoading$.next(!0),this.authController.resetPassword(e).subscribe(()=>{this.toastService.showSuccess("common.success","start.passwordResetSuccess"),this.router.navigate(["login"])},()=>this.resetPasswordLoading$.next(!1))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(d.F0),t.Y36(d.gz),t.Y36(w.QD),t.Y36(v.k))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-password-reset"]],decls:20,vars:19,consts:[[1,"wrapper-main"],[1,"wrapper-content"],[1,"title"],[1,"wrapper-form"],[1,"label"],["type","password",1,"input",3,"formControl"],["class","error",4,"ngIf"],[1,"btn-base",3,"disabled","click"],[1,"error"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"div",3),t.TgZ(6,"div",4),t._uU(7),t.ALo(8,"translate"),t.qZA(),t._UZ(9,"input",5),t.YNc(10,$,3,5,"div",6),t.TgZ(11,"div",4),t._uU(12),t.ALo(13,"translate"),t.qZA(),t._UZ(14,"input",5),t.YNc(15,U,3,5,"div",6),t.TgZ(16,"button",7),t.NdJ("click",function(){return r.resetPassword()}),t.ALo(17,"async"),t._uU(18),t.ALo(19,"translate"),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(3),t.Oqu(t.lcZ(4,9,"start.resetPassword")),t.xp6(4),t.Oqu(t.lcZ(8,11,"start.newPassword")),t.xp6(2),t.Q6J("formControl",r.newPassword),t.xp6(1),t.Q6J("ngIf",r.newPassword.dirty&&!r.newPassword.valid),t.xp6(2),t.Oqu(t.lcZ(13,13,"start.newPasswordConfirm")),t.xp6(2),t.Q6J("formControl",r.newPasswordConfirm),t.xp6(1),t.Q6J("ngIf",r.newPasswordConfirm.dirty&&!r.newPasswordConfirm.valid),t.xp6(1),t.Q6J("disabled",t.lcZ(17,15,r.resetPasswordLoading$)),t.xp6(2),t.hij(" ",t.lcZ(19,17,"common.confirm")," "))},directives:[o.Fj,o.JJ,o.oH,m.O5],pipes:[h.X$,m.Ov],styles:[".wrapper-main[_ngcontent-%COMP%]{height:100%;padding:0;align-content:center}.wrapper-content[_ngcontent-%COMP%]{max-width:600px;min-height:none;height:auto;margin:auto;padding:2rem 0rem}.wrapper-form[_ngcontent-%COMP%]{max-width:240px;margin:20px auto}.label[_ngcontent-%COMP%]{margin-top:10px}.btn-base[_ngcontent-%COMP%]{margin-top:30px;max-width:100%}"],changeDetection:0}),n})();var Q=a(2257),F=a(253);function R(n,i){1&n&&t._UZ(0,"app-input-base",10),2&n&&t.Q6J("options",i.$implicit)}function j(n,i){if(1&n&&(t.TgZ(0,"button",11),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n){const e=t.oxw();t.Q6J("disabled",!e.form.valid),t.xp6(1),t.hij(" ",t.lcZ(2,2,"start.register")," ")}}function H(n,i){1&n&&(t.TgZ(0,"div",12),t._UZ(1,"app-loading-indicator"),t.qZA())}const D=[{path:"login",component:Y},{path:"register",component:(()=>{class n{constructor(e,r,s,p,g,f,l){this.router=e,this.translateService=r,this.authController=s,this.engineService=p,this.repositoryService=g,this.toastService=f,this.validatorService=l,this.form=new o.cw({email:new o.NI(null,[o.kI.required,o.kI.email,o.kI.maxLength(c.bV)]),nickname:new o.NI(null,[o.kI.required,o.kI.minLength(c.yv),o.kI.maxLength(c.C_)]),password:new o.NI(null,[o.kI.required,o.kI.minLength(c.Z9),o.kI.maxLength(c.e2)]),passwordConfirm:new o.NI(null,[o.kI.required,o.kI.minLength(c.Z9),o.kI.maxLength(c.e2)])}),this.fields=[{form:this.form,key:"email",label:"start.email",type:"email",autocomplete:"email"},{form:this.form,key:"nickname",label:"start.nickname",type:"text",autocomplete:"off"},{form:this.form,key:"password",label:"start.password",type:"password",autocomplete:"new-password"},{form:this.form,key:"passwordConfirm",label:"start.passwordConfirm",type:"password",autocomplete:"new-password"}],this.submitLoading$=new u.X(!1)}get email(){return this.form.get("email")}get nickname(){return this.form.get("nickname")}get password(){return this.form.get("password")}get passwordConfirm(){return this.form.get("passwordConfirm")}ngOnInit(){const e=this.fields.filter(s=>"nickname"===s.key)[0],r=this.fields.filter(s=>"password"===s.key)[0];e.hint=this.translateService.instant("start.nicknameHint",{min:c.yv,max:c.C_}),r.hint=this.translateService.instant("start.passwordHint",{min:c.Z9,max:c.e2})}validatePasswords(){return this.password.value===this.passwordConfirm.value}register(){if(!this.form.valid)return void this.toastService.showError("errors.formInvalid","errors.formInvalidHint");if(!this.validatePasswords())return void this.toastService.showError("errors.error","start.passwordsMismatch");if(!this.validatorService.checkBannedWords(this.nickname.value))return;const e={email:this.email.value,nickname:this.nickname.value,password:this.password.value};this.submitLoading$.next(!0),this.authController.register(e).subscribe(r=>{this.submitLoading$.next(!1),this.toastService.showSuccess("start.registerSuccess","start.confirmEmail"),this.router.navigate(["../start/login"])},r=>{this.submitLoading$.next(!1)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(d.F0),t.Y36(h.sK),t.Y36(w.QD),t.Y36(x.S),t.Y36(C.b),t.Y36(v.k),t.Y36(Q.o))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-register"]],decls:22,vars:20,consts:[[1,"wrapper-main"],[1,"wrapper-content"],[1,"title","title-main"],[1,"title","title-small"],[1,"wrapper-form"],[3,"formGroup","ngSubmit"],[3,"options",4,"ngFor","ngForOf"],["class","btn-base",3,"disabled",4,"ngIf"],["class","spinner","style","margin-top: 20px;",4,"ngIf"],["routerLink","../login",1,"btn-base"],[3,"options"],[1,"btn-base",3,"disabled"],[1,"spinner",2,"margin-top","20px"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"div",3),t.TgZ(6,"p"),t._uU(7),t.ALo(8,"translate"),t.qZA(),t.TgZ(9,"p"),t._uU(10),t.ALo(11,"translate"),t.qZA(),t.qZA(),t.TgZ(12,"div",4),t.TgZ(13,"form",5),t.NdJ("ngSubmit",function(){return r.register()}),t.YNc(14,R,1,1,"app-input-base",6),t.YNc(15,j,3,4,"button",7),t.ALo(16,"async"),t.YNc(17,H,2,0,"div",8),t.ALo(18,"async"),t.qZA(),t.qZA(),t.TgZ(19,"button",9),t._uU(20),t.ALo(21,"translate"),t.qZA(),t.qZA(),t.qZA()),2&e&&(t.xp6(3),t.Oqu(t.lcZ(4,8,"common.appName")),t.xp6(4),t.Oqu(t.lcZ(8,10,"start.registerHint")),t.xp6(3),t.Oqu(t.lcZ(11,12,"start.registerLore")),t.xp6(3),t.Q6J("formGroup",r.form),t.xp6(1),t.Q6J("ngForOf",r.fields),t.xp6(1),t.Q6J("ngIf",!t.lcZ(16,14,r.submitLoading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(18,16,r.submitLoading$)),t.xp6(3),t.hij(" ",t.lcZ(21,18,"common.back")," "))},directives:[o._Y,o.JL,o.sg,m.sg,F.r,m.O5,Z.Q,d.rH],pipes:[h.X$,m.Ov],styles:[".color-Common[_ngcontent-%COMP%]{color:#bbc3c8}.color-Scarce[_ngcontent-%COMP%]{color:#cdc90b}.color-Rare[_ngcontent-%COMP%]{color:#c967eb}.color-Mythical[_ngcontent-%COMP%]{color:#00e1e1}.wrapper-main[_ngcontent-%COMP%]{height:100%;padding:0;align-content:center}.wrapper-content[_ngcontent-%COMP%]{max-width:600px;min-height:none;height:auto;margin:auto;padding:2rem 0rem}.title[_ngcontent-%COMP%]{color:#c5a45f}.wrapper-img[_ngcontent-%COMP%]{width:90%;max-width:250px;margin:20px auto}.wrapper-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;margin:0}.wrapper-form[_ngcontent-%COMP%]{margin-top:20px;margin-bottom:40px}.title-main[_ngcontent-%COMP%]{margin-bottom:20px}.title-small[_ngcontent-%COMP%]{font-size:20px;line-height:1;padding:10px 0}.text-hint[_ngcontent-%COMP%]{font-size:20px}.btn-base[_ngcontent-%COMP%]{margin:20px auto}@media screen and (max-width: 990px){.wrapper-content[_ngcontent-%COMP%]{height:100%}}"],changeDetection:0}),n})()},{path:"reset-password",component:N},{path:"**",redirectTo:"login",pathMatch:"full"}];let X=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[d.Bz.forChild(D)],d.Bz]}),n})();var z=a(294);let E=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[m.ez,X,z.I.forChild()]]}),n})()}}]);