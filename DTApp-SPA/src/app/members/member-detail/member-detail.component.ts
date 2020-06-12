import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.queryParams.subscribe((params) => {
        const selectedTab = params['tab'];
        // this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
        this.memberTabs.tabs[3].active = true;
      });
    });
  }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe((data) => (this.user = data['user']));

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description,
      });
    }
    return imageUrls;
  }

  selectTab(tabid: number) {
    this.memberTabs.tabs[tabid].active = true;
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params.id).subscribe(
  //     (user) => {
  //       this.user = user;
  //     },
  //     (error) => this.alertify.error(error)
  //   );
  // }
}
