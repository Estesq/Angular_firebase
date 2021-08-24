import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { AdminService } from "../../shared/trkr-services/admin.service";
import { UserInterface } from "../../shared/models/user.interface";
import { Subscription } from "rxjs";
import { InviteClientComponent } from "../invite-client/invite-client.component";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import {CompanyService} from '../../shared/trkr-services/company.service';
import {CompanyInterface} from '../../shared/models/company.interface';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  subscription: Subscription;
  selectedCompany: CompanyInterface;

  id;
  selectedStatus: any;
  companies: any;
  loading = true;
  data: UserInterface[];
  selected = new EventEmitter<string>();
  selectedId;
  name;
  activeCompany: any;
  status = [
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" },

    { id: 4, name: "Pending" },
  ];
  constructor(
    private adminService: AdminService,
    private companiesService: CompanyService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router
  ) {
    // this.companies = [
    //   {
    //     id: 1,
    //     name: "Hooli",
    //     mc: "459711",
    //     contactPersonName: "Jacob Jones",
    //     city: "Indianapolis",
    //     state: "IN",
    //     mobilePhone: "(302) 555-0107",
    //     status: "Pending",
    //     type: "Pending",
    //   },
    //   {
    //     id: 2,
    //     name: "Genco Pura Olive Oil",
    //     mc: "835406",
    //     contactPersonName: "Darrell Steward",
    //     city: "Spokane",
    //     state: "WA",
    //     mobilePhone: "(406) 555-0120",
    //     status: "Active",
    //     type: "Broker",
    //   },
    //
    //   {
    //     id: 1,
    //     name: "Plexzap",
    //     mc: "823337",
    //     contactPersonName: "Bessie Cooper",
    //     city: "Spokan",
    //     state: "ZS",
    //     mobilePhone: "(319) 555-0115",
    //     status: "Pending",
    //     type: "Carrier",
    //   },
    //
    //   {
    //     id: 1,
    //     name: "Wayne Enterprises",
    //     mc: "1478",
    //     contactPersonName: "Courtney Henry",
    //     city: "Provo",
    //     state: "DR",
    //     mobilePhone: "(219) 555-0114",
    //     status: "Active",
    //     type: "Broker",
    //   },
    //
    //   {
    //     id: 1,
    //     name: "Olivia Pope & Associates",
    //     mc: "123654",
    //     contactPersonName: "Albert Flores",
    //     city: "Virginia City, VA",
    //     state: "BV",
    //     mobilePhone: "(303) 555-0105",
    //     status: "Pending",
    //     type: "Carrier",
    //   },
    //
    //   {
    //     id: 1,
    //     name: "The New York Inquirer",
    //     mc: "87458",
    //     contactPersonName: "Jerome Bell",
    //     city: "Asheville",
    //     state: "PO",
    //     mobilePhone: "(229) 555-0109",
    //     status: "Active",
    //     type: "Broker",
    //   },
    //
    //   {
    //     id: 1,
    //     name: "Cyberdyne Systems",
    //     mc: "36987",
    //     contactPersonName: "Guy Hawkins",
    //     city: "Ashevill",
    //     state: "ES",
    //     mobilePhone: "(302) 555-0107",
    //     status: "Pending",
    //     type: "Carrier",
    //   },
    //
    //   {
    //     id: 1,
    //     name: "Singletechno",
    //     mc: "1364",
    //     contactPersonName: "Jenny Wilson",
    //     city: "Asheville",
    //     state: "RD",
    //     mobilePhone: "(207) 555-0119",
    //     status: "Active",
    //     type: "Broker",
    //   },
    //
    //   {
    //     id: 1,
    //     name: "Good Burger",
    //     mc: "789654",
    //     contactPersonName: "Jenny Wilson",
    //     city: "JU",
    //     state: "CC",
    //     mobilePhone: "(907) 555-0101",
    //     status: "Active",
    //     type: "Carrier",
    //   },
    //   {
    //     id: 1,
    //     name: "Globex Corporation",
    //     mc: "1254",
    //     contactPersonName: "Darlene Robertson",
    //     city: "Des Moine",
    //     state: "SE",
    //     mobilePhone: "(671) 555-0110",
    //     status: "Pending",
    //     type: "Broker",
    //   },
    // ];
  }

  async ngOnInit() {
    this.subscription = await this.companiesService.readAllCompany().subscribe(res => {
      this.data = res
      console.log('companies', this.data);
      this.selectedCompany = this.data[0];
      this.loading = false;
      // this.subscription.unsubscribe();
      this.cdr.detectChanges();
    })
  }

  onSelect(company: CompanyInterface) {
    this.selectedCompany = company;
    console.log('this.selectedCompany', this.selectedCompany);
    // this.selected.emit(company);
    this.activeCompany = company;
  }

  selectId(id: string) {
    this.selectedId = id;
    this.cdr.detectChanges();
  }
  inviteClient() {
    const modalRef = this.modalService.open(InviteClientComponent);
  }
  // ngOnDestroy() {
  //   if (!this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
