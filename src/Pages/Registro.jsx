import React, { useState,useRef ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { crearUsuario } from "../helpers/fetchUsuarios";
import "../styles/Registro.css"

const Registro = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null)
  const [formValues, setFormValues] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmpass:"",
    role: "USER_ROLE",
  });

  const [message, setMessage] = useState([]);

  useEffect(() => {},[inputRef])
  

  const handleChange = ({ target }) => {
    let name = target.name;
    let value = target.value;
    
    setFormValues((prev) => {return {...prev,[name]:value}   } );
    
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    inputRef.current.setCustomValidity("")
  
    if(formValues.password === formValues.confirmpass){
      
      const respuesta = await crearUsuario(formValues);

      if (respuesta?.usuario) {
        setMessage([{ ok: true, msg: respuesta.msg }]);
        setTimeout(() => {
          setMessage([]);
        }, 3000);
      } else {
        if (respuesta?.errors) {
          setMessage(respuesta.errors);
        } else {
          setMessage([{ msg: respuesta.msg }]);
        }
      }
  
      setFormValues({nombre: "",
      email: "",
      password: "",
      confirmpass:"",
      role: "USER_ROLE",})
      
    }else{
      inputRef.current.setCustomValidity("Las contraseñas deben coincidir")
    }
    

  
  };

  return (
    <div className="contenedor">
    <div className="container  ">
      <div className="row registro-cuerpo">
        <div className="col-12 col-sm-12 col-md-12 offset-md-3   columna-contenedor">
          <div className="card card-cont">
            <div className="card-body formRegistro  ">
              <h3  className="text-center mb-3 title text-danger">
                <i  className="fa fa-user-plus me-2 " aria-hidden="true"></i>
                Registrar usuario
              </h3>
              <form  onSubmit={guardarDatos}>
                <input
                  className="form-control mb-2 input"
                  type="text"
                  placeholder="Ingrese su nombre o usuario"
                  name="nombre" maxLength={12} minLength={4}
                  value={formValues.nombre}
                  onChange={handleChange}
                  autoFocus={true}
                  autoComplete="off"
                />
                <input
                  className="form-control mb-2 input"
                  type="email" maxLength={40}
                  placeholder="Ingrese su email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <input
                  className="form-control input mt-1"
                  type="password"
                  placeholder="Ingrese contraseña"
                  name="password" maxLength={15} minLength={5}
                  value={formValues.password}
                  id="contraseña"
                  onChange={handleChange}
                />
                  <input
                  ref={inputRef}
                  required
                  className="form-control input"
                  type="password"
                  placeholder="Confirmar contraseña"
                  name="confirmpass"
                  id="confirmar_contraseña"
                  onChange={handleChange}
                />

                <div className="d-flex justify-content-end my-3">
                  <Link className="btn btn-black btn-outline-danger  submitBtn" to="/login">
                    Volver
                  </Link>

                  <button className="btn btn-black btn-outline-danger  submitBtn">Registrarse</button>
                </div>
              </form> {message.length > 0 &&
                message.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item?.ok ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {item.msg}
                  </div>
                ))}
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
