using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Server.Controllers
{
    [AllowAnonymous]
    public class AuthHub : Hub
    {
        public async Task<string> Authorize()
        {
            System.Console.WriteLine("AuthHub.Authorize");
            return await Task.Run(() => { return TokenHelper.GenerateToken(); });
        }
    }
}