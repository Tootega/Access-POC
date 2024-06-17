using System;
using System.Linq;
using System.Collections.Generic;
using TFX.CIT.Core.Commands;
using TFX.CIT.Core.Model;
using TFX.Core;
using TFX.Core.Reflections;
using STX.App.Core.INF.Usuario;

namespace STX.App.Core.INF.Test.Usuario
{
    [XRegister(typeof(UsuarioSAMdssdsdTestCITRule), "7B93C368-E345-4826-8611-9F971B99860D", typeof(UsuarioSAM), typeof(UsuarioSAMdssdsdTestCIT))]
    public class UsuarioSAMdssdsdTestCITRule : UsuarioSAMdssdsdTestCIT.XRule
    {
        public UsuarioSAMdssdsdTestCITRule()
        {
        }

        public override void Execute()
        {
            NewRecord();
            UsuarioSVC.XTuple r = Model.DataSet[CurrentPlay];
            ExecuteCommand(CurrentPlay, new XSendTextCommand(UsuarioSAM.UsuarioFRM.Fields.Nome, r.Nome)); // Nome
            ExecuteCommand(CurrentPlay, new XSendTextCommand(UsuarioSAM.UsuarioFRM.Fields.Login, r.Login)); // Login
            ExecuteCommand(CurrentPlay, new XSendDecimalCommand(UsuarioSAM.UsuarioFRM.Fields.CORxEstadoID, r.CORxEstadoID)); // Ativo
            SaveRecord();
            Search(UsuarioSVC.UsuarioFilterFRM.Fields.Nome, r.Nome);
            DoEditSingle();
            GetDataSet(AfterDataSet);
        }

        public override void Validade()
        {
        }
    }
}
