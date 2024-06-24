using System;
using STX.App.Core.INF.Usuario;

namespace STX.App.Core.TST.Usuario
{
    public class UsuarioSAMInsercoesTestSVCRule : UsuarioSAMInsercoesTestSVC.Rule
    {
        public override void BeforeExecute(Int32 pIndex, UsuarioTuple pTuple)
        {
        }

        public override void AfterExecute(Int32 pIndex, UsuarioTuple pTuple, UsuarioTuple pData)
        {
            Assert.True(pTuple.Login == pData.Login);
            Assert.True(pTuple.CORxEstadoID == pData.CORxEstadoID);
            Assert.True(pTuple.CORxUsuarioID == pData.CORxUsuarioID);
            Assert.True(pTuple.CORxPessoaID == pData.CORxPessoaID);
            Assert.True(pTuple.Nome == pData.Nome);
        }
    }
}