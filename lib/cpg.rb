# frozen_string_literal: true

require "erb"
require "logstash-logger"

require "cpg/version"

require "cpg/rack/base"
require "cpg/rack/configuration"
require "cpg/rack/spy"

module CPG
  class Application
    def call(env)
      req = Rack::Request.new(env)
      method = req.request_method
      path = req.path
      host = req.host

      res = if method == "GET" && ["/", "/login.html"].include?(path)
              erb = ERB.new(File.read(File.expand_path("./templates/index.erb", __dir__)))
              html = erb.result_with_hash(host: host)
              Rack::Response.new(html, 200, default_headers)
            else
              html = File.read(File.expand_path("./templates/error.html", __dir__))
              Rack::Response.new(html, 700, default_headers)
            end

      res.finish
    end

    private

    def default_headers
      {
        "Server" => "mini_httpd/1.19 19dec2003",
        "Content-Type" => "text/html; charset=euc-kr",
        "Set-Cookie" => "Web-Auth=File=startup.html:User=INVALID:path=/:Index=0:WebUpgrade=off",
      }
    end
  end
end
