using System;
using STX.App.Core.INF.Usuario;

namespace STX.App.Core.TST.Usuario
{
    public class UsuarioSAMInsercoesTestSAMRule : UsuarioSAMInsercoesTestSVCRule
    {
        public override void BeforeExecute(Int32 pIndex, UsuarioTuple pTuple)
        {
        }

        public override void AfterExecute(Int32 pIndex, UsuarioTuple pTuple, UsuarioTuple pData)
        {
            base.AfterExecute(pIndex, pTuple, pData);
        }
    }
}