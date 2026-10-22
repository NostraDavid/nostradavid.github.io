{pkgs, ...}: {
  cachix.enable = false;
  packages = with pkgs; [just nodejs_24 python314];
}
