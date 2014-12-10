package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import common.Emotion;
import common.SongTest;
import common.Test;
import edu.dei.gp.containers.GenericSongPack;
import edu.dei.gp.containers.SongLight;
import edu.dei.gp.containers.SongStatus;
import edu.dei.gp.ejb.remotes.FrontEndBeanRemote;
import edu.dei.gp.jpa.AVMoodTrack;
import edu.dei.gp.jpa.Artist;
import edu.dei.gp.jpa.Song;
import edu.dei.gp.jpa.auxiliary.DominantEmotion;

/**
 * Servlet implementation class SearchServlet
 */
@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @EJB
    FrontEndBeanRemote frontendBean;

    public SearchServlet() {
	super();
	// TODO Auto-generated constructor stub
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub

	int pageToCheck = 1;

		if (!request.getParameterMap().isEmpty())
		{
		    if (request.getParameter("FLAG") != null)
		    {
				String op = request.getParameter("FLAG");
				System.out.println("[SearchServlet] Executing Operation: " + op);
		
				/*RequestDispatcher dispatcher = null;
				HttpSession session = request.getSession(true);*/
				PrintWriter out = response.getWriter();
		
				if (op.equalsIgnoreCase("textsearch"))
				{
				    // Receives text value to search for
				    String toSearch = request.getParameter("text");
				    System.out.println("[SearchServlet] pesquisa pelo texto: "+toSearch);
				    GenericSongPack<SongLight> textSongs = frontendBean.searchAuthorAndTitle(toSearch, 1); //TODO CUIDADO, MUDAR PAGINA
				    
				    
				    if (textSongs!=null) {
				    	List<SongLight> songsList = textSongs.getListContents();
				    	String json = new Gson().toJson(songsList);
						out.write(json);
				    }
				    else
				    	out.write("null");
				    
				}
				else if (op.equalsIgnoreCase("avsearch")) {
		
				    // Receives value interval for Arousal and Valence
				    float minArousal = Float.parseFloat(request.getParameter("minArousal"));
				    float maxArousal = Float.parseFloat(request.getParameter("maxArousal"));
				    float minValence = Float.parseFloat(request.getParameter("minValence"));
				    float maxValence = Float.parseFloat(request.getParameter("maxValence"));
		
				    // Sends to FrontEndBean with values and page
				    GenericSongPack<SongLight> avSongs = frontendBean.searchArousalAndValenceValues(minArousal, maxArousal, minValence, maxValence, 1);//TODO CUIDADO, MUDAR PAGINA
		
				    if (avSongs != null) {
				    	List<SongLight> songsList = avSongs.getListContents();
						String json = new Gson().toJson(songsList);
						out.write(json);
				    }
				    else
				    	out.write("null");
				}
				else if (op.equalsIgnoreCase("getfeedback")) {		// feedback das musicas q estao em analise no sistema
		
				    GenericSongPack<SongStatus> songStatus = frontendBean.getSongsStatus(1);//TODO CUIDADO, MUDAR PAGINA

				    if (songStatus!=null && songStatus.getListContents().size()>0 ) {
				    	List<SongStatus> songsList = songStatus.getListContents();
						String json = new Gson().toJson(songsList);
						out.write(json);
				    }else
				    	out.write("null");
		
				}
				// TODO Returns all musics unfiltered
				else if (op.equalsIgnoreCase("getall")) {
				    GenericSongPack<SongLight> songs = frontendBean.getReadyLighSongs(1);
		
				    List<SongLight> songsList = songs.getListContents();
		
				    String json = new Gson().toJson(songsList);
				    out.write(json);
				}
				// TODO Returns music through it's id
				else if (op.equalsIgnoreCase("getmusic")) {
				    String songId = request.getParameter("songId");
				    Song theSong = frontendBean.getSongById(Integer.parseInt(songId));
		
				    String json = new Gson().toJson(theSong);
				    out.write(json);
		
				}
				else if (op.equalsIgnoreCase("editLyric")) {
				    String songId = request.getParameter("songId");
				    String text = request.getParameter("text");
		
				}		
		    }
		}
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub
    }

}
