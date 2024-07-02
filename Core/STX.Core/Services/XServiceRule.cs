using System;
using System.Linq;

using Microsoft.Extensions.Logging;

namespace STX.Core.Services
{
    public interface XIServiceRuleA : XIServiceRule
    {
        IQueryable<TQuery> InternalGetWhere<TQuery>(IQueryable<TQuery> pQuery, Object pPKValue, Boolean pFull);
    }

    public interface XIServiceRuleB : XIServiceRule
    {
        IQueryable<TQuery> InternalGetWhere<TQuery>(IQueryable<TQuery> pQuery, Object pFilter, Boolean pFull);
    }

    public interface XIServiceRuleC : XIServiceRule
    {
        IQueryable<TQuery> InternalGetWhere<TQuery>(IQueryable<TQuery> pQuery, Object pPKValue, Object pFilter, Boolean pFull);
    }

    public interface XIServiceRule
    {
        void InternalAfterSelect(Object pTuples);

        void InternalAfterFlush(Object pTuples);

        void InternalBeforeFlush(Object pTuples);

        IQueryable<TQuery> InternalGetWhere<TQuery>(IQueryable<TQuery> pQuery);
    }

    public abstract class XServiceRuleA<T, TPK> : XServiceRule<T>, XIServiceRuleA
    {

        public XServiceRuleA(XService pService)
            : base(pService)
        {
        }

        void XIServiceRule.InternalAfterFlush(Object pTuples)
        {
        }

        void XIServiceRule.InternalAfterSelect(Object pTuples)
        {
        }

        IQueryable<TQuery> XIServiceRuleA.InternalGetWhere<TQuery>(IQueryable<TQuery> pQuery, Object pPKValue, Boolean pFull)
        {
            return GetWhere(pQuery, (TPK)pPKValue, pFull);
        }

        protected virtual IQueryable<TQuery> GetWhere<TQuery>(IQueryable<TQuery> pQuery, TPK pPKValue, bool pFull)
        {
            return pQuery;
        }
        protected override sealed IQueryable<TQuery> GetWhere<TQuery>(IQueryable<TQuery> pQuery)
        {
            return pQuery;
        }
    }

    public abstract class XServiceRuleB<T, TF> : XServiceRule<T>, XIServiceRuleB
    {
        public XServiceRuleB(XService pService)
            : base(pService)
        {
        }

        void XIServiceRule.InternalAfterFlush(object pTuples)
        {
        }

        void XIServiceRule.InternalAfterSelect(object pTuples)
        {
        }

        IQueryable<TQuery> XIServiceRuleB.InternalGetWhere<TQuery>(IQueryable<TQuery> pQuery, Object pFilter, Boolean pFull)
        {
            return GetWhere(pQuery, (TF)pFilter, pFull);
        }

        protected virtual IQueryable<TQuery> GetWhere<TQuery>(IQueryable<TQuery> pQuery, TF pFilter, Boolean pFull)
        {
            return pQuery;
        }
        protected override sealed IQueryable<TQuery> GetWhere<TQuery>(IQueryable<TQuery> pQuery)
        {
            return pQuery;
        }
    }

    public abstract class XServiceRuleC<T, TF, TPK> : XServiceRule<T>, XIServiceRuleC
    {

        public XServiceRuleC(XService pService)
            : base(pService)
        {
        }

        IQueryable<TQuery> XIServiceRuleC.InternalGetWhere<TQuery>(IQueryable<TQuery> pQuery, Object pPKValue, Object pFilter, Boolean pFull)
        {
            return GetWhere(pQuery, (TPK)pPKValue, (TF)pFilter, pFull);
        }

        protected virtual IQueryable<TQuery> GetWhere<TQuery>(IQueryable<TQuery> pQuery, TPK pPKValue, TF pFilter, Boolean pFull)
        {
            return pQuery;
        }

        protected override sealed IQueryable<TQuery> GetWhere<TQuery>(IQueryable<TQuery> pQuery)
        {
            return pQuery;
        }
    }

    public abstract class XServiceRule<T> : XIServiceRule
    {

        public XServiceRule(XService pService)
        {
            Service = pService;
            Log = pService.Logger;
        }

        protected virtual T New()
        {
            return default;
        }

        protected ILogger Log;

        void XIServiceRule.InternalAfterFlush(Object pTuples)
        {
            AfterFlush((T)pTuples);
        }
        void XIServiceRule.InternalBeforeFlush(Object pTuples)
        {
            BeforeFlush((T)pTuples);
        }

        void XIServiceRule.InternalAfterSelect(Object pTuples)
        {
            AfterSelect((T)pTuples);
        }

        IQueryable<TQuery> XIServiceRule.InternalGetWhere<TQuery>(IQueryable<TQuery> pQuery)
        {
            return GetWhere(pQuery);
        }

        protected virtual IQueryable<TQuery> GetWhere<TQuery>(IQueryable<TQuery> pQuery)
        {
            return pQuery;
        }

        public XService Service
        {
            get;
        }

        protected virtual void AfterSelect(T pTuples)
        {
        }

        protected virtual void AfterFlush(T pTuples)
        {
        }

        protected virtual void BeforeFlush(T pTuples)
        {
        }

        protected TService GetConttroler<TService>() where TService : XService
        {
            var ctl = typeof(TService).CreateInstance<TService>(this.Service);
            return ctl;
        }
    }
}
