import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fdata:any;
  results:any;
  submitted = false;
  emplye: any;
  searchText;
  constructor(private s: DataService, private fb: FormBuilder) {} 
    form = this.fb.group({
    id: [],
    fname: ['', Validators.required],
    lname: ['', Validators.required] 
  })
ngOnInit() {
     this.getData();
  }

   getData()  {
    this.s.ge().subscribe(res=>this.fdata=res); 
    
  }
    get f() { return this.form.controls; }
    onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    alert('Are you sure want to enter data ?')
    this.s.po(this.form.value).subscribe(res=>this.getData());
    this.form.reset();
}
  del(d) {
    alert('Are you sure to delete ?')
    this.s.de(d.id).subscribe(res=>this.getData());
  }
  ed(d) {
    this.form.patchValue({
      id: d.id,
      fname: d.fname,
      lname: d.lname
    })
  }
  up() {
    alert('Are you sure to update ?')
    this.s.up(this.form.value).subscribe(res=>this.getData());
    this.form.reset(); 
  }
  openModa(e) {
    this.emplye = e;

  }
}

