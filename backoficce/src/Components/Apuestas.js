import React from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import axios from "axios";
import {TabPanel, TabView} from "primereact/tabview";


const urlMercados = 'https://localhost:44317/api/apuestas?mercado';
const urlEmail = 'https://localhost:44317/api/apuestas?email';
const urlEvento = 'https://localhost:44317/api/apuestas?evento';

class Apuestas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apuestas: [],
            mercados: [],
            idMercado: '',
            mercado: '',
            evento: '',
            email: '',
            mercadoDes: false,
            eventoDes: false,
            emailDes: false,
        }
    }

    render() {
        return (
            <TabView>
                <TabPanel header={'Filtrar Apuestas'}>
                    <div>
                        <div className={'grupo'}>
                            <div className={'separador'}><InputText disabled={this.state.emailDes} placeholder={'Email'}
                                                                    value={this.state.email}
                                                                    onChange={this.inputEmail}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.mercadoDes}
                                                                    placeholder={'Mercado'}
                                                                    value={this.state.mercado}
                                                                    onChange={this.inputNombre}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.eventoDes}
                                                                    placeholder={'Evento'}
                                                                    value={this.state.evento}
                                                                    onChange={this.inputApellidos}/>

                            </div>

                            <div className={'separador'}><Button label={"Buscar"} onClick={this.cargarLista}/></div>
                        </div>
                        <DataTable value={this.state.apuestas}>
                            <Column style={{width: '0em'}}/>
                            <Column style={{textAlign: 'center'}} sortable field="ApuestaId" header="ApuestaId"/>
                            <Column style={{textAlign: 'center'}} field="TipoCuota" header="Tipo Cuota"/>
                            <Column style={{textAlign: 'center'}} sortable field="Cuota" header="Cuota"/>
                            <Column style={{textAlign: 'center'}} sortable field="DineroApostado" header="D. Apostado"/>
                            <Column style={{textAlign: 'center'}} sortable field="FechaApuesta" header="FechaApuesta"/>
                            <Column style={{textAlign: 'center'}} field="UsuarioId" header="Email"/>
                        </DataTable>
                        <div className={'grupo'}>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header={'Bloquear Mercados'}>
                    <DataTable value={this.state.mercados}>
                        <Column style={{width: '0em'}}/>
                        <Column style={{textAlign: 'center'}} sortable field="MercadoId" header="MercadoId"/>
                        <Column style={{textAlign: 'center'}} sortable field="EventoId" header="EventoId"/>
                        <Column style={{textAlign: 'center'}} field="Bloqueado" header="Bloqueado"/>

                    </DataTable>
                    <div className={'grupo'}>
                        <div className={'separador'}><InputText placeholder={'IdMercado'}
                                                                value={this.state.idMercado}
                                                                onChange={(e) => this.setState({idMercado: e.target.value})}/>
                        </div>
                        <div className={'separador'}>
                            <Button label={"Bloquear"} className={'borrar'} onClick={this.bloquearMercado}/>

                        </div>

                        <div className={'separador'}><Button label={"Desbloquear"} className={'desbloquear'}
                                                             onClick={this.desbloquearMercado}/></div>
                    </div>
                </TabPanel>
            </TabView>


        );

    }

    cargarLista = () => {

        if (this.state.mercado.length !== 0) {
            this.query(urlMercados, this.state.mercado);
        }
        if (this.state.evento.length !== 0) {
            this.query(urlEvento, this.state.evento);
        }
        if (this.state.email.length !== 0) {
            this.query(urlEmail, this.state.email);
        }
        if (this.state.mercado === '' && this.state.evento === '' && this.state.email === '') {
            axios.get('https://localhost:44317/api/apuestas').then((respuesta) => {
                console.log(respuesta.data);
                this.setState({apuestas: respuesta.data});
            }).catch(e => {
                console.log("Error de conexion con la API");
            });
        }
        this.resetStates();

    }

    inputNombre = (e) => {
        this.setState({mercado: e.target.value});
        this.setState({eventoDes: true});
        this.setState({emailDes: true});
    }
    inputApellidos = (e) => {
        this.setState({evento: e.target.value});
        this.setState({mercadoDes: true});
        this.setState({emailDes: true});
    }
    inputEmail = (e) => {
        this.setState({email: e.target.value});
        this.setState({mercadoDes: true});
        this.setState({eventoDes: true});
    }

    bloquearMercado = () => {

        axios.put('https://localhost:44317/api/mercados?idMer=' + this.state.idMercado + '&block=' + true).then((respuesta) => {
            this.getMercados();
        }).catch(e => {
            console.log("Error de conexion con la API")
        });

    }
    desbloquearMercado = () => {
        axios.put('https://localhost:44317/api/mercados?idMer=' + this.state.idMercado + '&block=' + false).then((respuesta) => {
            this.getMercados();
        }).catch(e => {
            console.log("Error de conexion con la API")
        });

    }
    getMercados = () => {
        axios.get('https://localhost:44317/api/mercados').then((respuesta) => {
            respuesta.data.forEach(m => {
                if (m.Bloqueado === true) {
                    m.Bloqueado = '✓';
                } else {
                    m.Bloqueado = 'X';
                }
            })

            this.setState({mercados: respuesta.data});

        }).catch(e => {
            console.log("Error de conexion con la API")
        });
    }
    getApuestas = () => {
        axios.get('https://localhost:44317/api/apuestas').then((respuesta) => {
            this.setState({apuestas: respuesta.data});
        }).catch(e => {
            console.log("Error de conexion con la API")
        });

    }


    query = (url, param) => {
        axios.get(url + '=' + param).then((respuesta) => {
            if (respuesta.data === null) {
                alert("ningun usuario coincide con el nombre introducido");
            } else {
                this.setState({apuestas: respuesta.data});
            }
        }).catch(e => {
            console.log("Error de conexion con la API")
        })
    }
    resetStates = () => {
        this.setState({mercadoDes: false});
        this.setState({eventoDes: false});
        this.setState({emailDes: false});
        this.setState({mercado: ''});
        this.setState({evento: ''});
        this.setState({email: ''});
    }

    componentDidMount() {
        this.getApuestas();
        this.getMercados();
    }
}

export default Apuestas;
