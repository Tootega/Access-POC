using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace STX.Core.Automateds.Migrations
{
    /// <inheritdoc />
    public partial class STXCoreContextIni : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CORxJob",
                columns: table => new
                {
                    CORxJobID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxJob", x => x.CORxJobID);
                });

            migrationBuilder.CreateTable(
                name: "CORxJobConfiguracao",
                columns: table => new
                {
                    CORxJobConfiguracaoID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CORxJobID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Dados = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CORxJobConfiguracao", x => x.CORxJobConfiguracaoID);
                    table.ForeignKey(
                        name: "FK_F6BABB8A554A4A2CAA9BD16B8A9148F5",
                        column: x => x.CORxJobID,
                        principalTable: "CORxJob",
                        principalColumn: "CORxJobID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_F6BABB8A554A4A2CAA9BD16B8A9148F5",
                table: "CORxJobConfiguracao",
                column: "CORxJobID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CORxJobConfiguracao");

            migrationBuilder.DropTable(
                name: "CORxJob");
        }
    }
}
