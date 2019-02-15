
namespace game {
    
    export class JumpSystem extends ut.ComponentSystem {

        static canJump: boolean = true;
        
        OnUpdate(): void {

            this.world.forEach([ut.Entity, game.Jump, ut.Physics2D.Velocity2D],
                (entity, jump, velocity) => {
                    if ((ut.Runtime.Input.touchCount() > 0 || ut.Runtime.Input.getKey(ut.Core2D.KeyCode.Space)) && game.JumpSystem.canJump) {
                        game.JumpSystem.canJump = false;
                        let impulse = new ut.Physics2D.AddImpulse2D;
                        impulse.impulse = new Vector2(0, jump.jumpForce);
                        this.world.addComponentData(entity, impulse);
                    }
                });

            this.world.forEach([ut.Entity, game.Jump, ut.Physics2D.Velocity2D],
                (entity, jump, velocity) => {
                    if (velocity.velocity.length() == 0) {
                        game.JumpSystem.canJump = true;
                    }

                });
        }
    }
}
