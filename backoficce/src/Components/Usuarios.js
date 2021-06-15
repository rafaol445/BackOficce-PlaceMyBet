import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {TabPanel, TabView} from "primereact/tabview";
import axios from "axios";
import './components.css';

const urlUsuariosPorEmail = 'https://localhost:44317/api/usuarios?email';
const urlUsuariosPorNombre = 'https://localhost:44317/api/usuarios?nombre';
const urlUsuariosPorApellidos = 'https://localhost:44317/api/usuarios?apellido';


class Usuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            nombre: '',
            apellidos: '',
            email: '',
            nombreDes: false,
            apellidosDes: false,
            emailDes: false,
            oldPassWord: '',
            newPassWord: '',
        }
    }

    render() {
        return (
            <div>
                <TabView>
                    <TabPanel header={"Filtrar"}>
                        <div className={'grupo'}>

                            <div className={'separador'}><InputText disabled={this.state.emailDes} placeholder={'Email'}
                                                                    value={this.state.email}
                                                                    onChange={this.inputEmail}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.nombreDes}
                                                                    placeholder={'Nombre'}
                                                                    value={this.state.nombre}
                                                                    onChange={this.inputNombre}/>
                            </div>
                            <div className={'separador'}><InputText disabled={this.state.apellidosDes}
                                                                    placeholder={'Apellidos'}
                                                                    value={this.state.apellidos}
                                                                    onChange={this.inputApellidos}/>

                            </div>

                            <div className={'separador'}><Button label={"Buscar"} onClick={this.cargarLista}/></div>
                        </div>
                        <DataTable value={this.state.users}>
                            <Column selectionMode="multiple" style={{width: '3em'}}/>
                            <Column style={{textAlign:'center'}} field="UsuarioId" header="UsuarioId"/>
                            <Column style={{textAlign:'center'}} field="Nombre" header="Nombre"/>
                            <Column style={{textAlign:'center'}} field="Apellidos" header="Apellidos"/>
                            <Column style={{textAlign:'center'}} field="Edad" header="Edad"/>
                        </DataTable>
                        <div className={'grupo'}>
                            <div className={'separador'}/>
                            <div className={'separador'}><InputText placeholder={'Email'}
                                                                    value={this.state.email}
                                                                    onChange={(e) => this.setState({email: e.target.value})}/>
                            </div>

                            <div className={'separador'}><Button label={"Borrar"} className={'borrar'}
                                                                 onClick={this.borrarUsuario}/></div>
                        </div>

                    </TabPanel>
                    <TabPanel header={"Cambiar Contraseña"}>
                        <div className={'grupo'}>
                            <div className={'separador'}><InputText placeholder={'Email'}
                                                                    value={this.state.email}
                                                                    onChange={(e) => this.setState({email: e.target.value})}/>
                            </div>
                            <div className={'separador'}><InputText placeholder={'Contraseña Nueva'}
                                                                    value={this.state.newPassWord}
                                                                    onChange={(e) => this.setState({newPassWord: e.target.value})}/>
                            </div>
                            <div className={'separador'}><InputText placeholder={'Contraseña Vieja'}
                                                                    value={this.state.oldPassWord}
                                                                    onChange={(e) => this.setState({oldPassWord: e.target.value})}/>

                            </div>
                            <div className={'separador'}><Button label={"Buscar"} onClick={this.cambiarContrasenya}/>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>

            </div>
        );
    }

    cargarLista = () => {

        if (this.state.nombre.length !== 0) {
            this.query(urlUsuariosPorNombre, this.state.nombre);
        }
        if (this.state.apellidos.length !== 0) {
            this.query(urlUsuariosPorApellidos, this.state.apellidos);
        }
        if (this.state.email.length !== 0) {
            this.query(urlUsuariosPorEmail, this.state.email);
        }
        if (this.state.nombre === '' && this.state.apellidos === '' && this.state.email === '') {
            this.getUsuarios();
        }
        this.resetValues();
    }

    inputNombre = (e) => {
        this.setState({nombre: e.target.value});
        this.setState({apellidosDes: true});
        this.setState({emailDes: true});

    }

    inputApellidos = (e) => {
        this.setState({apellidos: e.target.value});
        this.setState({nombreDes: true});
        this.setState({emailDes: true});
    }

    inputEmail = (e) => {
        this.setState({email: e.target.value});
        this.setState({nombreDes: true});
        this.setState({apellidosDes: true});
    }

    resetValues = () => {
        this.setState({nombreDes: false});
        this.setState({apellidosDes: false});
        this.setState({emailDes: false});
        this.setState({nombre: ''});
        this.setState({apellidos: ''});
        this.setState({email: ''});
    }

    borrarUsuario = () => {

        if (this.state.email.length > 0) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Realmente desea borrar el usuario?")) {
                axios.delete('https://localhost:44317/api/usuarios?email=' + this.state.email).then(respuesta => {
                    alert("usuario borrado correctamente");
                    this.getUsuarios();
                }).catch(e => console.log(e));
                this.setState({email: ''});
            } else {
                this.query(urlUsuariosPorEmail, this.state.email);
            }
        } else {
            alert("Introduzca un Email valido");
        }
    }

    cambiarContrasenya = () => {
        const parametrosCambio = {
            oldPassWord: this.state.oldPassWord,
            newPassWord: this.state.newPassWord,
            confirmPassword: this.state.newPassWord
        }
        axios.post('https://localhost:44317/api/Account/newPassword?email=' + this.state.email, parametrosCambio)
            .then((response) => {
                console.log("Cambiada correctamente");
            }, (error) => {
                console.log(error);
            });


    }

    query = (url, param) => {
        axios.get(url + '=' + param).then((respuesta) => {
            if (respuesta.data.length === 0) {
                alert("ningun usuario coincide con el nombre introducido");
            } else {
                this.setState({users: respuesta.data});
            }
        }).catch(e => {
            console.log("Error de conexion con la API")
        })
    }

    getUsuarios = () => {
        axios.get('https://localhost:44317/api/usuarios').then((respuesta) => {
            this.setState({users: respuesta.data});
        }).catch(e => {
            console.log("Error de conexion con la API");
        });
    }

    componentDidMount() {
        this.getUsuarios();
    }
}

export default Usuarios;
