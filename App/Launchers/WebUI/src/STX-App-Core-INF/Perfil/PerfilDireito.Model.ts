//<auto-generated/>
import { XRule } from '../../material/Component/XComponent';
export namespace STXAppCoreINFPerfilPerfilDireitoMDL
{

    export class PerfilDireitoRule extends XRule<PerfilDireitoDataSet>
    {
    }

    export class PerfilDireitoTuple extends XDataTuple
    {
        constructor(pSource?: any)
        {
            super();
            this.Assign(pSource);
        }

            override GetPKValue(): any { return this.CORxPerfilDireiroID.Value; }

        CORxPerfilID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '');
        Direito = new XDataField(XFieldState.Empty, () => 'XString', () => '');
        Estado = new XDataField(XFieldState.Empty, () => 'XString', () => '');
        Nome = new XDataField(XFieldState.Empty, () => 'XString', () => '');
        SYSxEstadoID = new XDataField(XFieldState.Empty, () => 'XInt16', () => '');
        CORxPerfilDireiroID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '');
        CORxRecursoDireitoID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '');

    }

    export class PerfilDireitoDataSet extends XDataSet<PerfilDireitoTuple>
    {
        constructor(pDataSet?: PerfilDireitoDataSet)
        {
            super();
            if (pDataSet != null)
                this.Assign(PerfilDireitoTuple, pDataSet);
            if (this.Tuples)
                this.Tuples = new XArray<PerfilDireitoTuple>();
            for (var i = 0; i < this.Tuples.length; i++)
            {
                let ttpl = this.Tuples[i];
                let stpl = pDataSet.Tuples[i];
            }
        }

        override New()
        {
            var tpl = new PerfilDireitoTuple();
            tpl.CORxPerfilDireiroID.Value = Guid.NewGuid();
            this.Tuples.Add(tpl);
        }
    }

    export class PerfilDireitoRequest extends XRequest
    {
        CORxPerfilDireiroID?: string;
    }
}
