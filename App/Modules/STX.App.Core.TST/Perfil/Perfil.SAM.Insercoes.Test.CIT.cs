//<auto-generated/>
using System;
using System.Collections.Generic;
using STX.Access;
using STX.Core.Model;
using STX.Core.Services;
using STX.App.Core.TST.Perfil;
using STX.App.Core.INF.Perfil;

namespace STX.App.Core.TST.Perfil
{
    public class PerfilSAMInsercoesTest : XTest<PerfilSAMInsercoesTestRule, PerfilTuple>
    {
        public abstract class Rule :  XTestRule<PerfilTuple>
        {
        }

        [Theory, ClassData(typeof(Data))]
        public void Flush(Int32 pIndex, PerfilTuple pTuple)
        {
            PerfilSAMInsercoesTestRule rule = CreateRule();
            rule.BeforeExecute(pIndex, pTuple);
            IPerfilService persvc = new PerfilService((XService)null);
            PerfilDataSet dst = new PerfilDataSet();
            dst.Tuples.Add(pTuple);
            persvc.Flush(dst);
            persvc = new PerfilService((XService)null);
            PerfilDataSet dstret = persvc.GetByPK(new PerfilRequest { CORxPerfilID = pTuple.CORxPerfilID }, true);
            foreach (var tpl in dstret.Tuples)
                rule.AfterExecute(pIndex, tpl, pTuple);
        }

        public override void Run()
        {
        }

        public class Data : XTestData<PerfilTuple>
        {
            public Data()
            {
                PerfilTuple datatpl;
                datatpl = new PerfilTuple();
                datatpl.State = XTupleState.Added;
                Data.Add(new object[] {0, datatpl});
                datatpl.CORxPerfilID = new Guid("6A6A3E50-D571-479E-BDF3-CFD0C8131C11");
                datatpl.Nome = @"Maria da Silva";
                datatpl = new PerfilTuple();
                datatpl.State = XTupleState.Added;
                Data.Add(new object[] {1, datatpl});
                datatpl.CORxPerfilID = new Guid("28593322-554D-44A1-BAB0-C11E7A7EFB8A");
                datatpl.Nome = @"Jona de Souza Linhares";
            }

        }
    }
}