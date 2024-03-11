import { TestBed } from '@angular/core/testing';
import { CalculatorService } from "./calculator.service";
import { LoggerService } from './logger.service';
import { CoursesService } from './courses.service';


describe("Caculator Service", () => {

  let calculator: CalculatorService;
  let loggerSpy: any;

  //* Execute before all specs
  //* Excute for each test
  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService' , ['log']);
    

    //*Using testing module for di
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService , useValue: loggerSpy}
      ]
    })

    calculator = TestBed.inject(CalculatorService);
  })


  it("should add two numbers", () => {
    const result =  calculator.add(3 , 5);

    expect(result).toBe(8);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should substract two numbers", () => {
    const logger = jasmine.createSpyObj('LoggerService' , ['log']);
    
    const calculator = new CalculatorService(logger);

    const result =  calculator.subtract(5 , 3);

    expect(result).toBe(2);
  });
});
/* TestBed.inject(CoursesService) */