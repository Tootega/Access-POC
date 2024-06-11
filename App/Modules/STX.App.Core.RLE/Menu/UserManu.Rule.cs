using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using STX.Access.Model;
using STX.Core.Controllers;
using STX.Core.Model;
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
            foreach (var asm in AppDomain.CurrentDomain.GetAssemblies())
            {
                foreach (var tp in asm.GetTypes().Where(t => !t.IsAbstract && t.Implemnts<XSAMApplication>()))
                {
                    var app = tp.CreateInstance<XSAMApplication>();
                    var tpl = new UserManuTuple();
                    tpl.CORxRecursoID = new XGuidDataField("CORxRecursoID", XFieldState.Unchanged, app.MenuID);
                    tpl.Titulo = new XStringDataField("Titulo", XFieldState.Unchanged, app.Title);
                    tpl.Modulo = new XStringDataField("Modulo", XFieldState.Unchanged, "POC");
                    tpl.Icone = new XStringDataField("Icone ", XFieldState.Unchanged, "X");
                    tpl.Ordem = new XInt32DataField("Ordem ", XFieldState.Unchanged, 1);
                    pTuples.Add(tpl);
                }
            }

        }
    }
}
