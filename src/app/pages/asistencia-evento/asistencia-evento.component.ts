import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../../service/api.service';
import { Evento } from '../../models/evento.model';
import { User } from '../../models/user.model';
import { ApiResponse } from '../../models/api-response.model';
import { Asistencia } from '../../models/asistencia.model';

@Component({
  selector: 'app-asistencia-evento',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './asistencia-evento.component.html',
  styleUrls: ['./asistencia-evento.component.scss'],
})
export class AsistenciaEventoComponent implements OnInit {
  frmAsistencia: FormGroup;
  eventoList: Evento[] = []; 
  userList: User[] = []; 
  asistenciaList: Asistencia[] = []; 

  constructor(private apiService: ApiService) { 
    this.frmAsistencia = new FormGroup({
      evento: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required)
    });
  }

  getAsistenciaEvento() {
    this.apiService.get<Asistencia[]>('/evento/asistencia/all').subscribe({
      next: (response: ApiResponse<Asistencia[]>) => {
        this.asistenciaList = response.body || []; // Safely assign the response body
        console.log(this.asistenciaList);
      },
      error: err => {
        console.error(err); // Log the error
      }
    });
  }

  ngOnInit(): void {
    this.apiService.get<Evento[]>('/evento/all').subscribe({
      next: (response: ApiResponse<Evento[]>) => {
        this.eventoList = response.body || []; // Safely assign the response body
        console.log(this.eventoList);
      },
      error: err => {
        console.error(err); // Log the error
      }
    });

    this.apiService.get<User[]>('/user/all').subscribe({
      next: (response: ApiResponse<User[]>) => {
        this.userList = response.body || []; // Safely assign the response body
        console.log(this.userList);
      },
      error: err => {
        console.error(err); // Log the error
      }
    });

    this.getAsistenciaEvento();
  }
  
  asistencia() {
    console.log(this.frmAsistencia.value);
    

    // Aquí estamos asegurando que estamos usando ApiResponse<User>
    this.apiService.post<ApiResponse<Asistencia>>('/evento/asistencia/create', this.frmAsistencia.value).subscribe({
      next: (response) => {
        // Aquí la respuesta es del tipo ApiResponse<User>
        console.log(response);
        this.frmAsistencia.reset();
        alert("Asistencia Registrada.")
        this.getAsistenciaEvento();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}