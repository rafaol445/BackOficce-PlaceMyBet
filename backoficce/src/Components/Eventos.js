import React from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {TabPanel, TabView} from "primereact/tabview";
import axios from "axios";
const urlFecha = 'https://localhost:44317/api/eventos?fecha';
const urlLocal = 'https://localhost:44317/api/eventos?local';
const urlVisitante = 'https://localhost:44317/api/eventos?visitante';

class Eventos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventos: [],
            idEvento: '',
            fecha: '',
            local: '',
            visitante: '',
            fechaDes: false,
            localDes: false,
            visitanteDes: false,
        }
    }

    render() {
        return (
            <TabView>
                <TabPanel header="Filtro">
                    <div>
                        <div className={'grupo'}>
                            <div className={'separador'}><InputText disabled={this.state.fechaDes} placeholder={'Fecha'}
                                                                    value={this.state.fecha}
                                                                    onChange={this.inputFecha}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.localDes} placeholder={'Local'}
                                                                    value={this.state.local}
                                                                    onChange={this.inputLocal}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.visitanteDes}
                                                                    placeholder={'Visitante'}
                                                                    value={this.state.visitante}
                                                                    onChange={this.inputVisitante}/>
                            </div>

                            <div className={'separador'}><Button label={"Buscar"} onClick={this.cargarLista}/></div>
                        </div>

                        <DataTable value={this.state.eventos}>
                            <Column selectionMode="multiple" style={{width: '3em'}}/>
                            <Column field="EventoId" header="EventoId"/>
                            <Column field="Local" header="Local"/>
                            <Column field="Visitante" header="Visitante"/>
                            <Column field="FechaEvento" header="FechaEvento"/>
                        </DataTable>
                    </div>

                </TabPanel>
                <TabPanel header="Insertar">
                    <div>
                        <div className={'grupo'}>

                            <div className={'separador'}><InputText disabled={this.state.localDes} placeholder={'Local'}
                                                                    value={this.state.local}
                                                                    onChange={this.inputLocal}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.visitanteDes}
                                                                    placeholder={'Visitante'}
                                                                    value={this.state.visitante}
                                                                    onChange={this.inputVisitante}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.fechaDes} placeholder={'Fecha'}
                                                                    value={this.state.fecha}
                                                                    onChange={this.inputFecha}/>
                            </div>
                        </div>
                        <div className={'separador'}><Button label={"Insertar"} onClick={this.insetarEvento}/></div>
                        <div className={'grupo'}>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Actualizar">
                    <div>
                        <div className={'grupo'}>
                            <div className={'separador'}><InputText disabled={false} placeholder={'idEvento'}
                                                                    value={this.state.idEvento}
                                                                    onChange={this.inputIdEvento}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.localDes} placeholder={'Fecha'}
                                                                    value={this.state.fecha}
                                                                    onChange={this.inputFecha}/>
                            </div>
                        </div>
                        <div className={'separador'}><Button label={"Actualizar"} onClick={this.actualizarMercado}/>
                        </div>
                        <div className={'grupo'}>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Borrar">
                    <div>
                        <div className={'grupo'}>
                            <div className={'separador'}>
                            </div>
                            <div className={'separador'}>
                                <InputText disabled={false} placeholder={'idEvento'}
                                           value={this.state.idEvento}
                                           onChange={this.inputIdEvento}/>
                            </div>
                            <div className={'separador'}>
                            </div>
                        </div>
                        <div className={'separador'}><Button className={'borrar'} label={"Borrar"}
                                                             onClick={this.borraEvento}/></div>
                        <div className={'grupo'}>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        );

    }

    insetarEvento = () => {
        let evento = {
            Local: this.state.local,
            Visitante: this.state.visitante,
            FechaEvento: this.state.fecha
        };

        axios.post('https://localhost:44317/Api/eventos', evento)
            .then((response) => {
                console.log("Insertado correctamente");
            }, (error) => {
                console.log(error);
            });
        this.setState({fecha: ''});
        this.setState({local: ''});
        this.setState({visitante: ''});
    }
    actualizarMercado = () => {
        axios.put('https://localhost:44317/Api/eventos?id=' + this.state.idEvento + '&fecha=' + this.state.fecha).then((response) => {
            console.log(response.data);
        }, (error) => {
            console.log(error);
        });
        this.setState({fecha: ''});
        this.setState({idEvento: ''});
    }
    borraEvento = () => {

        if (this.state.idEvento.length > 0) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Realmente desea borrar el Evento?")) {
                axios.delete('https://localhost:44317/api/eventos?id=' + this.state.idEvento).then(respuesta => {
                    this.setState({idEvento: ''});

                }).catch(e => console.log(e));
                this.setState({email: ''});

            } else {
                this.consultaEmail();
            }
        } else {
            alert("Introduzca un Email valido");
        }

    }

    cargarLista = () => {

        if (this.state.local.length !== 0) {
            this.query(urlLocal, this.state.local);
        }
        if (this.state.visitante.length !== 0) {
            this.query(urlVisitante, this.state.visitante);
        }
        if (this.state.fecha.length !== 0) {
            this.query(urlFecha, this.state.fecha);
        }
        if (this.state.local === '' && this.state.visitante === '' && this.state.fecha === '') {
            this.getEventos();

        }
        this.setState({fechaDes: false});
        this.setState({localDes: false});
        this.setState({visitanteDes: false});
        this.setState({fecha: ''});
        this.setState({local: ''});
        this.setState({visitante: ''});
    }
    inputIdEvento = (e) => {
        this.setState({idEvento: e.target.value});

    }

    inputLocal = (e) => {
        this.setState({local: e.target.value});

    }
    inputVisitante = (e) => {
        this.setState({visitante: e.target.value});

    }
    inputFecha = (e) => {
        this.setState({fecha: e.target.value});

    }
    getEventos = () => {
        axios.get('https://localhost:44317/api/eventos').then((respuesta) => {
            this.setState({eventos: respuesta.data});
        }).catch(e => {
            console.log("Error de conexion con la API");
        });
    }

    query = (url, param) => {
        axios.get(url + '=' + param).then((respuesta) => {
            if (respuesta.data === null) {
                alert("ningun Evento coincide con el nombre introducido");
            } else {
                this.setState({eventos: respuesta.data});
            }
        }).catch(e => {
            console.log("Error de conexion con la API");
        })
    }

    componentDidMount() {
        this.getEventos();
    }


}

export default Eventos;
