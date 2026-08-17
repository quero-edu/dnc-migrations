import { useContext, useEffect, useState } from 'react'

// ASSETS
import './ProjectsLists.css'
import LikeFilled from '../../assets/like-filled.svg'
import LikeOutline from '../../assets/like-outline.svg'
import LoadingSpinner from '../../assets/loading-spinner.gif'

// COMPONENTS
import Button from '../../components/Button/Button'

// CONTEXTS
import { AppContext } from '../../contexts/AppContext'

// SERVICES
import { getApiData } from '../../services/apiServices'

const ProjectsLists = () => {
    const appContext = useContext(AppContext)
    const [projects, setProject] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projects = await getApiData("projects")
                setProject(projects)
            } catch (err) {
                setProject([])
            }
        }

        fetchData()
    }, [])

    // FAV PROJECTS
    const [favProjects, setFavProject] = useState([])

    useEffect(() => {
        const savedFavProjects = JSON.parse(sessionStorage.getItem('favProjects'))
        if (savedFavProjects) {
            setFavProject(savedFavProjects)
        }
    }, [])

    const handleFavProjects = (id) => {
        setFavProject((prevFavProjects) => {
            if (prevFavProjects.includes(id)) {
                const filtedArray = prevFavProjects.filter((projectId) => projectId !== id)
                sessionStorage.setItem('favProjects', JSON.stringify(filtedArray))
                return prevFavProjects.filter((projectId) => projectId !== id)
            } else {
                sessionStorage.setItem('favProjects', JSON.stringify([...prevFavProjects, id]))
                return [...prevFavProjects, id]
            }
        })
    }

    return (
        <div className="projects-section">
            <div className="projects-hero">
                <h2>{appContext.languages[appContext.language].projects.title}</h2>
                <p className="grey-1-color">{appContext.languages[appContext.language].projects.subtitle}</p>
            </div>
            {projects ? (
                <div className="projects-grid">
                {projects.map((project) => (
                    <div
                        className="project-card d-flex jc-center al-center fd-column"
                        key={project.id}
                    >
                        <div
                            className="thumb tertiary-background"
                            style={{ backgroundImage: `url(${project.thumb})` }}
                        ></div>
                        <h3>{project.title}</h3>
                        <p className="grey-1-color">{project.subtitle}</p>
                        <Button
                            buttonStyle="unstyled"
                            onClick={() => handleFavProjects(project.id)}
                        >
                            <img
                                src={favProjects.includes(project.id) ? LikeFilled : LikeOutline}
                                alt="Like"
                                height="20px"
                            />
                        </Button>
                    </div>
                ))}
                </div>
            ) : (
                <img src={LoadingSpinner} alt="Loading" height="40px" />
            )}
        </div>
    )
}

export default ProjectsLists