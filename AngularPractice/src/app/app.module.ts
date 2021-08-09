import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DxButtonModule } from 'devextreme-angular';

import { Component, Input, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import * as AspNetData from "devextreme-aspnet-data-nojquery";

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     DxButtonModule,
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })


export class AppModule { }
export const employeeList=[
  { 'Id':1,
    'Name':'David',
    'Mobile':'0933152667',
    'Email':'david@gmail.com',
    'Department':'總經理室',
    'Title':'CEO'
  },
  { 'Id':2,
    'Name':'Mary',
    'Mobile':'0938-456889',
    'Email':'mary@gmail.com',
    'Department':'製造部',
    'Title':'副理'
  },
  { 'Id':3,
    'Name':'Judy',
    'Mobile':'0930-456189',
    'Email':'judy@gmail.com',
    'Department':'製造部',
    'Title':'技術員'
  },
  { 'Id':4,
    'Name':'May',
    'Mobile':'0922-456889',
    'Email':'may@gmail.com',
    'Department':'製造部',
    'Title':'技術員'
  },
  { 'Id':5,
    'Name':'Joe',
    'Mobile':'0925-330025',
    'Email':'joe@gmail.com',
    'Department':'資訊部',
    'Title':'經理'
  },
  { 'Id':6,
    'Name':'John',
    'Mobile':'0930-111225',
    'Email':'john@gmail.com',
    'Department':'資訊部',
    'Title':'軟體工程師'
  },
  { 'Id':7,
    'Name':'Kevin',
    'Mobile':'0988-577225',
    'Email':'kevin@gmail.com',
    'Department':'資訊部',
    'Title':'硬體工程師'
  },
  { 'Id':8,
    'Name':'Amy',
    'Mobile':'0983-5718923',
    'Email':'amy@gmail.com',
    'Department':'行企室',
    'Title':'管理師'
  },
  { 'Id':9,
    'Name':'Emma',
    'Mobile':'0988-234192',
    'Email':'emma@gmail.com',
    'Department':'行企室',
    'Title':'人資專員'
  },
  { 'Id':10,
    'Name':'Cathy',
    'Mobile':'0982-188412',
    'Email':'cathy@gmail.com',
    'Department':'行企室',
    'Title':'會計'
  }
];
