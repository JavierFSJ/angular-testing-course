import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';

describe('Courses Service' , () => {

  let coursesService!: CoursesService,
    httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService 
      ]
    })

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it('should retrive all courses' , () => {

    coursesService.findAllCourses()
      .subscribe( response => {
        expect(response).toBeTruthy('No courses return');
        expect(response.length).toBe(12 , 'Incorrect number of courses');
      })


    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual("GET");
    req.flush({
      payload: Object.values(COURSES)
    });
  });



})