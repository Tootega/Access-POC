//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using STX.Core.Model;
using STX.Core.Interfaces;
using STX.Access.Model;
using STX.Core.Services;

namespace STX.App.Core.INF.Menu
{
    public class UserManuTuple : XServiceDataTuple
    {
        public XGuidDataField CORxRecursoID {get;set;}
        public XStringDataField Titulo {get;set;}
        public XInt32DataField Ordem {get;set;}
        public XStringDataField Modulo {get;set;}
        public XStringDataField Icone {get;set;}
        public XGuidDataField CORxMenuItemID {get;set;}
        public XGuidDataField CORxMenuItemPaiID {get;set;}
    }

    public class UserManuFilter : XFilter
    {
        public XGuidDataField CORxRecursoID {get;set;}
    }
    public static class FRMUserManuFilter
    {
        public static readonly XFRMField CORxRecursoID = new XFRMField(new Guid("7C88B63C-B848-416E-86EF-1FF03BF45285"), "CORxRecursoID");
    }

    public class UserManuRequest : XRequest
    {
        public Guid CORxRecursoID {get;set;}
    }

    public interface IUserManuService : XIService
    {
        UserManuDataSet GetByPK(UserManuRequest pRequest, Boolean pFull = true);
        UserManuDataSet Select(UserManuFilter pFilter, Boolean pFull = false);
        UserManuDataSet Select(UserManuRequest pRequest, UserManuFilter pFilter, Boolean pFull);
    }

    public abstract class BaseUserManuRule : XServiceRuleC<List<UserManuTuple>, UserManuFilter, UserManuRequest>
    {
        public BaseUserManuRule(XService pOwner)
            :base(pOwner)
        {
        }
    }

    public class UserManuDataSet : XDataSet<UserManuTuple>
    {
    }
}