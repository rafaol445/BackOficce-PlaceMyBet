import React from 'react';
import axios from "axios";
import {Chart} from 'primereact/chart';
import {TabPanel, TabView} from "primereact/tabview";
let apuestasMes = [];
let altasMes = [];

class Informes extends React.Component {
    state = {
        ApuestasMes: [],
    }

    render() {
        const basicOptions = {
            legend: {
                labels: {
                    fontColor: '#495053'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }]
            }
        };

        const apuestasPorMes = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Apuestas',
                    data: apuestasMes,
                    borderColor: 'red'
                }
            ]
        };
        const altasPorMes = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Altas',
                    data: altasMes,
                    borderColor: '#42A5F5'
                }
            ]
        };

        return (
            <TabView>
                <TabPanel header={'Apuestas al mes'}>
                    <div>
                        <div className="card">
                            <h5>Apuestas Por Mes</h5>
                            <Chart type="line" data={apuestasPorMes} options={basicOptions}/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header={'Altas al mes'}>
                    <div>
                        <div className="card">
                            <h5>Altas Por Mes</h5>
                            <Chart type="line" data={altasPorMes} options={basicOptions}/>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        );
    }

    componentDidMount() {
        this.getApuestasMes();
        this.getAltasMes();
    }

    getApuestasMes = () => {
        axios.get('https://localhost:44317/api/apuestas?n=1').then((respuesta) => {
            apuestasMes = respuesta.data;
        }).catch(e => {
            console.log("Error de " + e)
        });
    }
    getAltasMes = () => {
        axios.get('https://localhost:44317/api/usuarios?n=1').then((respuesta) => {
            altasMes = respuesta.data;
            this.setState({apuestasMes: respuesta.data});
        }).catch(e => {
            console.log("Error de conexion con la API")
        });


    }
}

export default Informes;
