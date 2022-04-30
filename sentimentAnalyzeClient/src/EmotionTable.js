import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
         <center>
          <table className="table table-bordered w-50 mt-5">
            <tbody>
              {
                  this.props.emotions && Object.entries(this.props.emotions).map(function (element,val) {
                  return (
                    <tr key={element}>
                      <td>{element[0]}</td>
                        <td>{element[1]}</td>
                    </tr>
                  );
                })
              }
          </tbody>
          
          </table>
        </center>
        </div>
          );
        }
    
}
export default EmotionTable;
