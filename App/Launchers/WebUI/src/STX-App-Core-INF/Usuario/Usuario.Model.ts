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

        Login = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, 'd1a31f1c-79a2-4905-b189-dc459a889162');
        CORxEstadoID = new XDataField(XFieldState.Empty, () => 'XInt16', () => '', null, null, 'af8db0cb-cf2c-4b2b-a2c7-75fc697fb391');
        CORxUsuarioID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '', null, null, '1760f18e-333d-434c-8d5a-50eb576fb661');
        CORxPessoaID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '', null, null, '1f1fb0ca-0938-4f12-b37e-d0742b2d5607');
        Nome = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, '874fce52-0bfa-4c76-9ac7-006236a307e9');
        CORxPerfilID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '', null, null, '1522b5c3-392a-4d85-8639-8d70dcf2393c');
        PerfilNome = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, '39a8109a-8807-4d0f-a674-4590293b252c');

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
        Nome = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, 'a2173584-a43b-4995-a282-f37c4f245a6f');
        Login = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, 'a2173584-a43b-4995-a282-f37c4f245a6f');
        PerfilNome = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, 'a2173584-a43b-4995-a282-f37c4f245a6f');
    }
}
