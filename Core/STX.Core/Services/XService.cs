using System;
using System.Linq;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

using STX.Core.Interfaces;
using STX.Core.Model;

namespace STX.Core.Services
{
    public abstract class XService : IDisposable
    {
        public XService(XService pOwner)
        {
            Owner = pOwner;
            Logger = pOwner?.Logger;
        }

        public XService(ILogger<XService> pLogger)
        {
            Logger = pLogger;
        }

        protected XDBContext ProtectedContext;
        protected internal readonly ILogger<XService> Logger;
        private bool _Dispoded;



        public XService Owner
        {
            get;
        }

        public EntityState GetState(XServiceDataTuple pTuple, params XIDataField[] pFields)
        {
            if (pTuple.State.In(XTupleState.Deleted, XTupleState.Added))
                return (EntityState)pTuple.State;

            if (pFields.IsEmpty())
                return EntityState.Detached;

            foreach (XIDataField field in pFields)
                if (field.State == XFieldState.Modified)
                    return EntityState.Modified;

            return EntityState.Unchanged;
        }

        public bool HasChanges(XServiceDataTuple pTuple, params XIDataField[] pFields)
        {
            return pTuple.State.In(XTupleState.Deleted, XTupleState.Added) || pFields.IsFull() && pFields.Any(f => f.State == XFieldState.Modified);
        }

        protected virtual XDBContext CreateContext(XDBContext pOwner)
        {
            return ProtectedContext;
        }

        public virtual TContext GetContext<TContext>() where TContext : XDBContext
        {
            if (ProtectedContext == null)
                ProtectedContext = CreateContext(Owner?.ProtectedContext);
            if (Owner?.ProtectedContext != null && Owner?.ProtectedContext.Database.CurrentTransaction != null)
                ProtectedContext.Database.UseTransaction(Owner?.ProtectedContext.Database.CurrentTransaction.GetDbTransaction());
            return (TContext)ProtectedContext;
        }

        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool pDispoded)
        {
            if (_Dispoded || Owner != null)
                return;
            _Dispoded = true;
            ProtectedContext?.Dispose();
        }
    }
}
