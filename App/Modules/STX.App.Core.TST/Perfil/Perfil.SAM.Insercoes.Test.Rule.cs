using System;
using STX.App.Core.INF.Perfil;

namespace STX.App.Core.TST.Perfil
{
    public class PerfilSAMInsercoesTestRule : PerfilSAMInsercoesTest.Rule
    {
        public override void BeforeExecute(Int32 pIndex, PerfilTuple pTuple)
        {
        }

        public override void AfterExecute(Int32 pIndex, PerfilTuple pTuple, PerfilTuple pData)
        {
            Assert.True(pTuple.CORxPerfilID == pData.CORxPerfilID);
            Assert.True(pTuple.Nome == pData.Nome);
        }
    }
}
