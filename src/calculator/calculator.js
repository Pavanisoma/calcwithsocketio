import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./calculator.css";


const socket = io("http://localhost:8000");

export function Calculator() {  
  const [calcLog, setCalcLog] = useState([]);
  const [expression, setExpression] = useState("");

  useEffect(() => {   
    socket.on("calculation", data => {
      if (calcLog.length === 10) calcLog.shift();
      setCalcLog([...calcLog, data.calculation]);
      console.log(calcLog);
    });
   
  }, [calcLog]);

  const emitfunc = exp => {    
    socket.emit("subscribeToLogs", {
      calculation: exp
    });
    console.log(typeof calcLog[0]);
    console.log(calcLog);
    if (calcLog.length === 10) calcLog.shift();
    setCalcLog([...calcLog, exp]);
  };

  const calculate = () => {
    try {
     console.log(expression);
      const result = eval(expression) | "";
      setExpression(result.toString());
      emitfunc(expression + " = " + result);
    } catch (e) {
      setExpression("")
      emitfunc(expression + "-> Invalid Input");
    }
  };

  const CalcEventClick = event => {
    switch (event) {
      case "c":
        setExpression(expression.slice(0, -1));
        break;

      case "d":
        setExpression("");
        break;

      case "=":
        calculate();
        break;

      default:
        setExpression(expression.replace(/^(0+)/g, '') + "" + event);
        break;
    }
  };
  
  return (
    <div>
      <div className="flex-container">
        <div className="flex-item">
          <table className="table-style">
            <tbody>
              <tr>
                <td colSpan={4} className="calc-header" id="calc-header">
                  {expression}
                </td>
              </tr>
              <tr>
                <td className="button" onClick={() => CalcEventClick(7)}>
                  7
                </td>
                <td className="button" onClick={() => CalcEventClick(8)}>
                  8
                </td>
                <td className="button" onClick={() => CalcEventClick(9)}>
                  9
                </td>
                <td
                  className="button button-operator"
                  onClick={() => CalcEventClick("/")}
                  id="buttonDivide"
                >
                  /
                </td>
              </tr>
              <tr>
                <td className="button" onClick={() => CalcEventClick(4)}>
                  4
                </td>
                <td className="button" onClick={() => CalcEventClick(5)}>
                  5
                </td>
                <td className="button" onClick={() => CalcEventClick(6)}>
                  6
                </td>
                <td
                  className="button button-operator"
                  onClick={() => CalcEventClick("*")}
                  id="buttonMul"
                >
                  *
                </td>
              </tr>
              <tr>
                <td className="button" onClick={() => CalcEventClick(1)}>
                  1
                </td>
                <td
                  className="button"
                  onClick={() => CalcEventClick(2)}
                  id="button2"
                >
                  2
                </td>
                <td
                  className="button"
                  onClick={() => CalcEventClick(3)}
                  id="button3"
                >
                  3
                </td>
                <td
                  className="button button-operator"
                  onClick={() => CalcEventClick("+")}
                  id="buttonPlus"
                >
                  +
                </td>
              </tr>
              <tr>
                <td
                  className="button button-cancel"
                  onClick={() => CalcEventClick("c")}
                >
                  C
                </td>
                <td className="button" onClick={() => CalcEventClick(0)}>
                  0
                </td>
                <td className="button" onClick={() => CalcEventClick(".")}>
                  .
                </td>
                <td
                  className="button button-operator"
                  onClick={() => CalcEventClick("-")}
                  id="buttonMinus"
                >
                  -
                </td>
              </tr>
              <tr>
                <td
                  className="button button-cancel"
                  onClick={() => CalcEventClick("d")}
                  id="buttonDel"
                >
                  Del
                </td>
                <td
                  colSpan={3}
                  style={{ width: "190px" }}
                  className="button button-operator"
                  onClick={() => CalcEventClick("=")}
                  id="buttonEqual"
                >
                  Cal
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-item">
          <strong>Logs</strong>
          <div className="calc-log">
            <ul>
              {calcLog.reverse().map((calc, index) => (
                <li key={index}>{calc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
