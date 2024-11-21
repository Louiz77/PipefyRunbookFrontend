import React from "react";
import './styles_conta.css'

export default function (props) {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Entre na sua conta</h3>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Digite seu email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Digite sua senha"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Esqueceu a sua <a href="#">senha?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }
