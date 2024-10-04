import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service'; // Verifica que la ruta sea correcta
import { Contacto } from '../../models/contacto.model'; // Asegúrate de que esto esté correcto
import { ApiResponse } from '../../models/api-response.model'; // Importa el modelo de respuesta

@Component({
  selector: 'app-contacto',
  standalone: true,
  providers: [ApiService],
  imports: [IonicModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  frmContacto: FormGroup;

  constructor(private apiService: ApiService) { 
    this.frmContacto = new FormGroup({
      nombre: new FormControl('',Validators.required),
      correo: new FormControl('',Validators.required),
      descripcion: new FormControl('',Validators.required),
    });
  }

  ngOnInit() {}

  contacto(){
    console.log(this.frmContacto.value);

    // Aquí estamos asegurando que estamos usando ApiResponse<User>
    this.apiService.post<ApiResponse<Contacto>>('/set-contacto', this.frmContacto.value).subscribe({
      next: (response) => {
        // Aquí la respuesta es del tipo ApiResponse<User>
        console.log(response);
        this.frmContacto.reset();
        alert("Registrado Existosamente");
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
