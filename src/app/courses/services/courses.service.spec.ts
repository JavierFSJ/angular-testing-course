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

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual("GET" , 'http Method Incorrect');

    
    req.flush({
      payload: Object.values(COURSES)
    });

    httpTestingController.verify();
  });

  it('should find a course by id' , () => {
    const id = 12

    coursesService.findCourseById(id)
      .subscribe( response => {
        expect(response.id).toBe(id , 'Incorrect register')
        expect(response).toBeTruthy('No courses return');
      })

    const req = httpTestingController.expectOne(`/api/courses/${id}`);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual("GET" , 'http Method Incorrect');

    
    req.flush({
      id: 12,
      titles: {
        description: 'Angular Testing Course',
        longDescription: 'In-depth guide to Unit Testing and E2E Testing of Angular Applications'
      },
      iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png',
      category: 'BEGINNER',
      seqNo: 0,
      url: 'angular-testing-course',
      lessonsCount: 10,
    });


    httpTestingController.verify();
  })

})