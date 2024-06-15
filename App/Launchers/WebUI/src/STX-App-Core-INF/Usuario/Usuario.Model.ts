//<auto-generated/>
import { XRule } from '../../material/Component/XComponent';
export namespace STXAppCoreINFUsuarioUsuarioMDL
{

    export class UsuarioRule extends XRule<UsuarioDataSet>
    {
    }

    export class UsuarioTuple extends XDataTuple
    {
        constructor(pSource?: any)
        {
            super();
            this.Assign(pSource);
        }

        override GetPKValue(): any { return this.CORxUsuarioID.Value; }

        Login = new XDataField(XFieldState.Empty, () => 'XString', () => '');
        CORxEstadoID = new XDataField(XFieldState.Empty, () => 'XInt16', () => '');
        CORxUsuarioID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '');
        CORxPessoaID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '');
        Nome = new XDataField(XFieldState.Empty, () => 'XString', () => '');

    }

    export class UsuarioDataSet extends XDataSet<UsuarioTuple>
    {
        constructor(pDataSet?: UsuarioDataSet)
        {
            super();
            if (pDataSet != null)
                this.Assign(UsuarioTuple, pDataSet);
            if (!this.Tuples)
                this.Tuples = new XArray<UsuarioTuple>();
            for (var i = 0; i < this.Tuples.length; i++)
            {
                let ttpl = this.Tuples[i];
                let stpl = pDataSet.Tuples[i];
            }
        }

        override New()
        {
            var tpl = new UsuarioTuple();
            tpl.CORxPessoaID.Value = Guid.NewGuid();
            tpl.CORxUsuarioID.Value = Guid.NewGuid();
            tpl.State = XTupleState.Added;
            this.Tuples.Add(tpl);
        }
    }

    export class UsuarioRequest extends XRequest
    {
        CORxUsuarioID?: string;
    }

    export class UsuarioFilter extends XFilter
    {
        Nome = new XDataField(XFieldState.Empty, () => 'XString', () => '');
        Login = new XDataField(XFieldState.Empty, () => 'XString', () => '');
    }
}
