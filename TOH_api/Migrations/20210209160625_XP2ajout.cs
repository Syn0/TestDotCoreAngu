using Microsoft.EntityFrameworkCore.Migrations;

namespace TOH.Migrations
{
    public partial class XP2ajout : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "XP2",
                table: "Hero",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "XP2",
                table: "Hero");
        }
    }
}
