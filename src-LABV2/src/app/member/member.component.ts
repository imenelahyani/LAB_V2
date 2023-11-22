import { Component, OnInit } from '@angular/core';
import { Member } from '../../modeles/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6', '7'];

  constructor(private MS: MemberService) {
    //injection de dependance
  }
  dataSource: Member[] = this.MS.tab;

  ngOnInit(): void {
    this.fetch();
  }

  handleButtonClick(id: string): void {
    //lancer la boite
    this.MS.deleteMemberById(id).subscribe(() => {
      this.fetch();
    });
  }
  fetch(): void {
    this.MS.getAllMembers().subscribe((tab) => {
      this.dataSource = tab;
    });
  }
}
