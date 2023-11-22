import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Member } from 'src/modeles/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private httpClient: HttpClient) {}
  tab: Member[] = GLOBAL._DB.members;
  memberToSave!: Member;
  saveMember(member: any): Observable<void> {
    /*return this.httpClient.post<Member>(
      'http://localhost:9000/MEMBRE-SERVICE',
      member
    );*/

    this.memberToSave = {
      ...member,
      id: member.id ?? Math.ceil(Math.random() * 10000),
      createdDate: member.createdDate ?? new Date().toISOString(),
    };
    this.tab = [
      this.memberToSave,
      ...this.tab.filter((item) => item.id != this.memberToSave.id),
    ];
    return new Observable((observer) => {
      observer.next();
    });
  }

  getMemberById(idCourant: String): Observable<Member> {
    /*return this.httpClient.get<Member>(
      'http://localhost:9000/MEMBRE-SERVICE/fullmember/'+idCourant,
    );*/

    return new Observable((observer) => {
      observer.next(this.tab.find((item) => item.id == idCourant));
    });
  }

  deleteMemberById(id: string): Observable<void> {
    //return this.httpClient.delete<void>('http://localhost:9000/MEMBRE-SERVICE/delete..'+id);

    this.tab = this.tab.filter((item) => item.id != id);
    return new Observable((observer) => {
      observer.next();
    });
  }

  getAllMembers(): Observable<Member[]> {
    //return this.httpClient.get<Member[]>('http://localhost:9000/MEMBRE-SERVICE/members');

    return new Observable((observer) => {
      observer.next(this.tab);
    });
  }
}
