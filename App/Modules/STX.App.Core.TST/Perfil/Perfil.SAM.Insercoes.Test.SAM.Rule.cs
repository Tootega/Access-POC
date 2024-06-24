using System;
using STX.App.Core.INF.Perfil;

namespace STX.App.Core.TST.Perfil
{
    public class PerfilSAMInsercoesTestSAMRule : PerfilSAMInsercoesTestSVCRule
    {
        public override void BeforeExecute(Int32 pIndex, PerfilTuple pTuple)
        {
        }

        public override void AfterExecute(Int32 pIndex, PerfilTuple pTuple, PerfilTuple pData)
        {
            base.AfterExecute(pIndex, pTuple, pData);
        }
    }
}