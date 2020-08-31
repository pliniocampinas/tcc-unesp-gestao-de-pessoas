import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface MenuNode {
  name: string;
  children?: MenuNode[];
  rota?: string;
}

const TREE_DATA: MenuNode[] = [
  {
    name: 'Cadastros',
    children: [
      {name: 'Usuários', rota: '/lista-usuarios'},
      {name: 'Pessoas', rota: '/lista-pessoas'},
      {name: 'Atividades Realizadas', rota: '/lista-atividades'},
      {name: 'Ocorrências', rota: '/lista-ocorrencias'}
    ]
  },
  {
    name: 'Visualizações',
    children: [
      {name: 'Fichas', rota: '/fichas'},
      {name: 'Visão Geral', rota: '/visao-geral'}
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  rota: string;
  level: number;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  private transformer = (node: MenuNode, plevel: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      rota: node.rota,
      level: plevel
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable,
    node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
  }

}
