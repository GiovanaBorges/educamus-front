import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-materia-delete',
  templateUrl: './materia-delete.component.html',
  styleUrls: ['./materia-delete.component.css']
})
export class MateriaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/signIn'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdMateria(this.idTema)
  }


  findByIdMateria(id: number){
    this.temaService.getByIdMateria(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  apagar(){
    this.temaService.deleteMateria(this.idTema).subscribe(()=>{
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/materiasEdit'])
    })
  }

}
