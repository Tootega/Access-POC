using System.Collections.Generic;

using STX.Core.Services;

namespace STX.App.Core.INF.Menu
{
    public class UserManuRule : BaseUserManuRule
    {
        public UserManuRule(XService pService)
               : base(pService)
        {
        }

        protected override void AfterSelect(List<UserManuTuple> pTuples)
        {
            //foreach (var asm in AppDomain.CurrentDomain.GetAssemblies())
            //{
            //    foreach (var tp in asm.GetTypes().Where(t => !t.IsAbstract && t.Implemnts<XSAMApplication>()))
            //    {
            //        var app = tp.CreateInstance<XSAMApplication>();
            //        var tpl = new UserManuTuple();

            //        tpl.CORxRecursoID = new XGuidDataField(XFieldState.Unchanged, app.MenuID);
            //        tpl.Titulo = new XStringDataField(XFieldState.Unchanged, app.Title);
            //        tpl.Modulo = new XStringDataField(XFieldState.Unchanged, "POC");
            //        tpl.Icone = new XStringDataField(XFieldState.Unchanged, "bi bi-alipay");
            //        tpl.Ordem = new XInt32DataField(XFieldState.Unchanged, 1);
            //        pTuples.Add(tpl);
            //    }
            //}

        }
    }
}
