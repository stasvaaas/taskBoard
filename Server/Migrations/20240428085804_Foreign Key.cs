using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cards_Lists_ListId",
                table: "Cards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lists",
                table: "Lists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cards",
                table: "Cards");

            migrationBuilder.RenameTable(
                name: "Lists",
                newName: "lists");

            migrationBuilder.RenameTable(
                name: "Cards",
                newName: "cards");

            migrationBuilder.RenameIndex(
                name: "IX_Cards_ListId",
                table: "cards",
                newName: "IX_cards_ListId");

            migrationBuilder.AlterColumn<Guid>(
                name: "ListId",
                table: "cards",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_lists",
                table: "lists",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_cards",
                table: "cards",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_cards_lists_ListId",
                table: "cards",
                column: "ListId",
                principalTable: "lists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_cards_lists_ListId",
                table: "cards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_lists",
                table: "lists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_cards",
                table: "cards");

            migrationBuilder.RenameTable(
                name: "lists",
                newName: "Lists");

            migrationBuilder.RenameTable(
                name: "cards",
                newName: "Cards");

            migrationBuilder.RenameIndex(
                name: "IX_cards_ListId",
                table: "Cards",
                newName: "IX_Cards_ListId");

            migrationBuilder.AlterColumn<Guid>(
                name: "ListId",
                table: "Cards",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lists",
                table: "Lists",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cards",
                table: "Cards",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cards_Lists_ListId",
                table: "Cards",
                column: "ListId",
                principalTable: "Lists",
                principalColumn: "Id");
        }
    }
}
