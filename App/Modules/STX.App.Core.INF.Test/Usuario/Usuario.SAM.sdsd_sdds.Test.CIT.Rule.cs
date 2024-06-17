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
    [XRegister(typeof(UsuarioSAMsdsd_sddsTestCITRule), "8B7BC0D7-51B6-41B8-AFE5-BD9BF55745B2", typeof(UsuarioSAM), typeof(UsuarioSAMsdsd_sddsTestCIT))]
    public class UsuarioSAMsdsd_sddsTestCITRule : UsuarioSAMsdsd_sddsTestCIT.XRule
    {
        public UsuarioSAMsdsd_sddsTestCITRule()
        {
        }

        public override void Execute()
        {
            NewRecord();
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
