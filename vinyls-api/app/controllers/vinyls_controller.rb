class VinylsController < ApplicationController
    def index
        vinyls = Vinyl.all
        render json: vinyls.to_json
    end
end
