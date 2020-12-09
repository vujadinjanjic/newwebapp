import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MakeSellerDialogComponent } from '../add-manifestation/make-seller-dialog/make-seller-dialog.component';



@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css'],
})
export class AdminsListComponent implements AfterViewInit {
  users: User[];
  user: User;
  displayedColumns: string[] = [
    'username',
    'name',
    'surname',
    'role',
    'changeRole',
    'button1',
  ];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {}


  ngAfterViewInit() {
    this.loadUsers();
    
  }
  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  makeSeller() {
    const dialogRef = this.dialog.open(MakeSellerDialogComponent, {
      width: '550px',
      height: '700px',
      data: {},
    });
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe(
      (res) => {
        this.alertify.success('Uspesno blokiran korisnik!');
      },
      (error) => {
        this.alertify.warning('Ne mozete blokirati korisnika 2 puta!');
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

