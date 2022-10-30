import * as React from "react";
import Table from "react-bootstrap/Table";

function TwoDays(props){
    return (
            <Table striped bordered hover>
                 <thead><tr><th>Час</th><th>Погода</th><th>Температура</th></tr></thead>
                 <tbody>
                 <tr>
                     <td>{props.day}</td>
                         <img src={`http://openweathermap.org/img/wn/${props.icon}.png`} alt={props.status}/>
                     <td>{props.temp}</td>
                 </tr>
                </tbody>
            </Table>
    )
}

export default TwoDays;
