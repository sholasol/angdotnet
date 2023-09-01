import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/services/user-store.service';import { Component } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  public users:any = []; //users property
  public fullName : string = ""; //get full name from token
  public role!: string ; //! makes the role undefined




  constructor(
    private api : ApiService, 
    private auth: AuthService,
    private userStore: UserStoreService,
    ){ }

    ngOnInit(){
      this.api.getUsers()
      .subscribe(res=>{
        //this.users = res;
      });

      this.userStore.getFullnameFromStore().subscribe(
        val => {
          let fullnameFromToken = this.auth.getfullnameFromToken(); //can get fulllname from token or
          this.fullName = val || fullnameFromToken //get the values from val or from token
        })

        //controlling access based on user role
        this.userStore.getRoleFromStore()
        .subscribe(val =>{
          const roleFromToken = this.auth.getRoleFromToken(); //get role from token
          this.role = val || roleFromToken;
        })

    }

    logout(){
      this.auth.singOut();
    }

}
