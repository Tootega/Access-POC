using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace STX.App.Core.INF.DB.Migrations
{
    /// <inheritdoc />
    public partial class SQLServerIni : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CORxEstado",
                columns: table => new
                {
                    CORxEstadoID = table.Column<short>(type: "smallint", nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxEstado", x => x.CORxEstadoID);
                });

            migrationBuilder.CreateTable(
                name: "CORxPerfil",
                columns: table => new
                {
                    CORxPerfilID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxPerfil", x => x.CORxPerfilID);
                });

            migrationBuilder.CreateTable(
                name: "CORxPessoa",
                columns: table => new
                {
                    CORxPessoaID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxPessoa", x => x.CORxPessoaID);
                });

            migrationBuilder.CreateTable(
                name: "CORxRecurso",
                columns: table => new
                {
                    CORxRecursoID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxRecurso", x => x.CORxRecursoID);
                });

            migrationBuilder.CreateTable(
                name: "TAFxUsuario",
                columns: table => new
                {
                    TAFxUsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ativo = table.Column<short>(type: "smallint", nullable: false),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TAFxUsuario", x => x.TAFxUsuarioID);
                });

            migrationBuilder.CreateTable(
                name: "CORxDireiro",
                columns: table => new
                {
                    CORxDireiroID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Direito = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    SYSxEstadoID = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxDireiro", x => x.CORxDireiroID);
                    table.ForeignKey(
                        name: "FK_2C9B6EBB73B54370A430415BCD452E6E",
                        column: x => x.SYSxEstadoID,
                        principalTable: "CORxEstado",
                        principalColumn: "CORxEstadoID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CORxUsuario",
                columns: table => new
                {
                    CORxUsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CORxPessoaID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TAFxUsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxUsuario", x => x.CORxUsuarioID);
                    table.ForeignKey(
                        name: "FK_74C786F513D84B83B262F901573BCE27",
                        column: x => x.CORxUsuarioID,
                        principalTable: "TAFxUsuario",
                        principalColumn: "TAFxUsuarioID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_C9471B8665C04206AC2FBA967434C37A",
                        column: x => x.CORxPessoaID,
                        principalTable: "CORxPessoa",
                        principalColumn: "CORxPessoaID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CORxUsuario_TAFxUsuario_TAFxUsuarioID",
                        column: x => x.TAFxUsuarioID,
                        principalTable: "TAFxUsuario",
                        principalColumn: "TAFxUsuarioID");
                });

            migrationBuilder.CreateTable(
                name: "CORxPerfilDireiro",
                columns: table => new
                {
                    CORxPerfilDireiroID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CORxDireiroID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CORxPerfilID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxPerfilDireiro", x => x.CORxPerfilDireiroID);
                    table.ForeignKey(
                        name: "FK_C6414CDFD26A410BA65457F3CD38FE4A",
                        column: x => x.CORxDireiroID,
                        principalTable: "CORxDireiro",
                        principalColumn: "CORxDireiroID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DB2EF4796E004A85B4BBEC4BAFB60B61",
                        column: x => x.CORxPerfilID,
                        principalTable: "CORxPerfil",
                        principalColumn: "CORxPerfilID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CORxRecursoDireito",
                columns: table => new
                {
                    CORxRecursoDireitoID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CORxDireiroID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CORxRecursoID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SYSxEstadoID = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxRecursoDireito", x => x.CORxRecursoDireitoID);
                    table.ForeignKey(
                        name: "FK_63A2BC55DE5B48F9B50DB67210086133",
                        column: x => x.CORxRecursoID,
                        principalTable: "CORxRecurso",
                        principalColumn: "CORxRecursoID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_662808A15CC541869E041EB76DBF81F2",
                        column: x => x.SYSxEstadoID,
                        principalTable: "CORxEstado",
                        principalColumn: "CORxEstadoID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FEBE37E773C04510917C09AA991BA695",
                        column: x => x.CORxDireiroID,
                        principalTable: "CORxDireiro",
                        principalColumn: "CORxDireiroID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CORxUsuarioPerfil",
                columns: table => new
                {
                    CORxUsuarioPerfilID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CORxPerfilID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CORxUsuarioID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SYSxEstadoID = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxUsuarioPerfil", x => x.CORxUsuarioPerfilID);
                    table.ForeignKey(
                        name: "FK_277FC3C02F294E4BB98861248A39AF3E",
                        column: x => x.CORxUsuarioID,
                        principalTable: "CORxUsuario",
                        principalColumn: "CORxUsuarioID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_A1545961E23B49F9A6C3797816459BA6",
                        column: x => x.CORxPerfilID,
                        principalTable: "CORxPerfil",
                        principalColumn: "CORxPerfilID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DF6B83584AFE4750963FA1CCDD988B7A",
                        column: x => x.SYSxEstadoID,
                        principalTable: "CORxEstado",
                        principalColumn: "CORxEstadoID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "CORxEstado",
                columns: new[] { "CORxEstadoID", "Estado" },
                values: new object[,]
                {
                    { (short)0, "Inativo" },
                    { (short)1, "Ativo" }
                });

            migrationBuilder.InsertData(
                table: "CORxDireiro",
                columns: new[] { "CORxDireiroID", "Direito", "SYSxEstadoID" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000000"), "Visualizar", (short)0 },
                    { new Guid("4b7d2e6b-5500-4156-b6f8-3a42c3a9b398"), "Alterar", (short)0 },
                    { new Guid("79457e9e-9948-4c3c-8605-d810af504e4c"), "Deletar", (short)0 },
                    { new Guid("dd926a04-2489-4bef-baba-87f63000b330"), "Inativar", (short)0 },
                    { new Guid("ec1effea-1ccf-45fe-be30-b91ce86673a8"), "Inserir", (short)0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_2C9B6EBB73B54370A430415BCD452E6E",
                table: "CORxDireiro",
                column: "SYSxEstadoID");

            migrationBuilder.CreateIndex(
                name: "IX_8EA98120_28B4_458C_946B_E9B0000C518D",
                table: "CORxPerfilDireiro",
                columns: new[] { "CORxPerfilID", "CORxDireiroID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_C6414CDFD26A410BA65457F3CD38FE4A",
                table: "CORxPerfilDireiro",
                column: "CORxDireiroID");

            migrationBuilder.CreateIndex(
                name: "IX_DB2EF4796E004A85B4BBEC4BAFB60B61",
                table: "CORxPerfilDireiro",
                column: "CORxPerfilID");

            migrationBuilder.CreateIndex(
                name: "IX_29FB7252_4D26_4B87_85F7_DED1FB18AC29",
                table: "CORxRecursoDireito",
                columns: new[] { "CORxDireiroID", "CORxRecursoID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_63A2BC55DE5B48F9B50DB67210086133",
                table: "CORxRecursoDireito",
                column: "CORxRecursoID");

            migrationBuilder.CreateIndex(
                name: "IX_662808A15CC541869E041EB76DBF81F2",
                table: "CORxRecursoDireito",
                column: "SYSxEstadoID");

            migrationBuilder.CreateIndex(
                name: "IX_FEBE37E773C04510917C09AA991BA695",
                table: "CORxRecursoDireito",
                column: "CORxDireiroID");

            migrationBuilder.CreateIndex(
                name: "IX_74C786F513D84B83B262F901573BCE27",
                table: "CORxUsuario",
                column: "CORxUsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_C9471B8665C04206AC2FBA967434C37A",
                table: "CORxUsuario",
                column: "CORxPessoaID");

            migrationBuilder.CreateIndex(
                name: "IX_CORxUsuario_TAFxUsuarioID",
                table: "CORxUsuario",
                column: "TAFxUsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_277FC3C02F294E4BB98861248A39AF3E",
                table: "CORxUsuarioPerfil",
                column: "CORxUsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_41898A44_44C6_4757_BCD7_45183345E9D3",
                table: "CORxUsuarioPerfil",
                columns: new[] { "CORxUsuarioID", "CORxPerfilID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_A1545961E23B49F9A6C3797816459BA6",
                table: "CORxUsuarioPerfil",
                column: "CORxPerfilID");

            migrationBuilder.CreateIndex(
                name: "IX_DF6B83584AFE4750963FA1CCDD988B7A",
                table: "CORxUsuarioPerfil",
                column: "SYSxEstadoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CORxPerfilDireiro");

            migrationBuilder.DropTable(
                name: "CORxRecursoDireito");

            migrationBuilder.DropTable(
                name: "CORxUsuarioPerfil");

            migrationBuilder.DropTable(
                name: "CORxRecurso");

            migrationBuilder.DropTable(
                name: "CORxDireiro");

            migrationBuilder.DropTable(
                name: "CORxUsuario");

            migrationBuilder.DropTable(
                name: "CORxPerfil");

            migrationBuilder.DropTable(
                name: "CORxEstado");

            migrationBuilder.DropTable(
                name: "TAFxUsuario");

            migrationBuilder.DropTable(
                name: "CORxPessoa");
        }
    }
}
